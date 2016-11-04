'use strict';
import * as vscode from 'vscode';

import { ExtPrefix, BufferSize } from './constants'; 

import { RingBuffer } from './RingBuffer';

export function activateKillring(context: vscode.ExtensionContext) {
    let kr = new KillRing()

    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".yank", () => {
        vscode.commands.executeCommand("editor.action.clipboardPasteAction")
        .then(()=>{
            vscode.commands.executeCommand(ExtPrefix + ".cancelSelection")
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".kill-region", () => {
        vscode.commands.executeCommand("editor.action.clipboardCutAction")
        .then(() => {
            vscode.commands.executeCommand(ExtPrefix + ".cancelSelection");
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".kill-ring-save", () => {
        vscode.commands.executeCommand("editor.action.clipboardCopyAction")
        .then(() => {
            vscode.commands.executeCommand(ExtPrefix + ".cancelSelection");
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".kill-line", () => {
        vscode.commands.executeCommand(ExtPrefix + ".cancelSelection")
        .then(() => {
            vscode.commands.executeCommand("cursorEndSelect")
        }).then(() => {
            vscode.commands.executeCommand("editor.action.clipboardCutAction");
        }).then(() => {
            vscode.commands.executeCommand(ExtPrefix + ".cancelSelection");
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

    copy(range: vscode.Range = null): boolean {
        if (range === null) {
            range = this.getSelectionRange();
            if (range === null) {
                return false;
            }
        }
        this.killRing.enqueue(vscode.window.activeTextEditor.document.getText(range));
        return true
    }

    cut(range: vscode.Range = null): boolean { 
        if (range === null){
            range = this.getSelectionRange();
        } 
        if (!this.copy(range)) {
            return false;
        }
        this.delete(range);
        return true;
    }

    yank(): number {
        const c = this.killRing.last();
        vscode.window.activeTextEditor.edit(editBuilder => {
            editBuilder.insert(this.getSelection().active, c);
        });

        this.isKillRepeated = false;
        return c.length;
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
        });
    }
}
