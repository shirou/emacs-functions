'use strict';
import * as vscode from 'vscode';

import { ExtPrefix, BufferSize } from './constants';

import { RingBuffer } from './RingBuffer';

var ncp = require("copy-paste");

export function activateKillring(context: vscode.ExtensionContext) {
    let kr = new KillRing();

    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".yank", () => {
        kr.yank()
            .then(() => {
                vscode.commands.executeCommand(ExtPrefix + ".cancelSelection");
            });
    }));
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".kill-region", () => {
        const pos = vscode.window.activeTextEditor.selection;
        if (pos.isEmpty) {
            return;
        }
        kr.cut()
            .then(() => {
                vscode.commands.executeCommand(ExtPrefix + ".cancelSelection");
            });
    }));
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".kill-ring-save", () => {
        kr.copy()
            .then(() => {
                vscode.commands.executeCommand(ExtPrefix + ".cancelSelection");
            });
    }));
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".kill-line", () => {
        vscode.commands.executeCommand(ExtPrefix + ".cancelSelection")
            .then(() => {
                let editor = vscode.window.activeTextEditor;
                const here = editor.selection.active;
                const line = editor.document.lineAt(here);
                if (here.character === line.range.end.character) { // cursor is at end of line areadly.
                    const range = new vscode.Range(here, line.rangeIncludingLineBreak.end);
                    kr.cut(range);
                } else {
                    const range = new vscode.Range(here, line.range.end);
                    kr.cut(range);
                }
            });
    }));
}


class KillRing {
    private killRing: RingBuffer;
    private isKillRepeated: boolean;

    constructor() {
        this.killRing = new RingBuffer(BufferSize);
        this.isKillRepeated = false;
        vscode.window.onDidChangeTextEditorSelection(() => {
            this.isKillRepeated = false;
        });
    }

    copy(range: vscode.Range = null): Thenable<boolean> {
        return new Promise((resolve) => {
            if (range === null) {
                range = this.getSelectionRange();
                if (range === null) {
                    resolve(false);
                    return;
                }
            }
            const t = vscode.window.activeTextEditor.document.getText(range);
            ncp.copy(t);
            this.killRing.enqueue(t);
            resolve(true);
        });
    }

    cut(range: vscode.Range = null): Thenable<boolean> {
        return new Promise((resolve) => {
            if (range === null) {
                range = this.getSelectionRange();
            }
            if (!this.copy(range)) {
                resolve(false);
                return;
            }
            this.delete(range);
            resolve(true);
        });
    }

    yank(): Thenable<string> {
        return new Promise((resolve) => {
            ncp.paste((err, c) => {
                const s = this.getSelection();
                vscode.window.activeTextEditor.edit(editBuilder => {
                    if (c === null || c.length === 0) {
                        resolve();
                        return;
                    }
                    editBuilder.replace(s, c);
                }).then(() => {
                    const p = s.end.translate(0, c.length);
                    this.setSelection(p, p);
                    resolve();
                });
            });
            this.isKillRepeated = false;
        });
    }

    private getSelectionRange(): vscode.Range {
        const selection = vscode.window.activeTextEditor.selection,
            start = selection.start,
            end = selection.end;
        return (start.character !== end.character || start.line !== end.line) ? new vscode.Range(start, end) : null;
    }

    private getSelection(): vscode.Selection {
        return vscode.window.activeTextEditor.selection;
    }

    private setSelection(start: vscode.Position, end: vscode.Position): void {
        let editor = vscode.window.activeTextEditor;
        editor.selection = new vscode.Selection(start, end);
    }

    private delete(range: vscode.Range = null): Thenable<boolean> {
        if (range === null) {
            const start = new vscode.Position(0, 0),
                doc = vscode.window.activeTextEditor.document,
                end = doc.lineAt(doc.lineCount - 1).range.end;

            range = new vscode.Range(start, end);
        }
        return vscode.window.activeTextEditor.edit(editBuilder => {
            editBuilder.delete(range);
            // move cursor to start position.
            const newSelection = new vscode.Selection(range.start, range.start);
            const editor = vscode.window.activeTextEditor;
            editor.selection = newSelection;
        });
    }
}
