'use strict';
import * as vscode from 'vscode';

enum Scroll {
    Center,
    Top,
    Bottom
}
import { ExtPrefix } from './constants';


export function activateText(context: vscode.ExtensionContext) {
    var scrollPosition: Scroll = Scroll.Center;
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".back-to-indentation", () => {
        let editor = vscode.window.activeTextEditor;

        const pos = editor.selection.active;
        const line = editor.document.lineAt(pos.line);
        const n = new vscode.Position(pos.line, line.firstNonWhitespaceCharacterIndex);
        editor.selection = new vscode.Selection(n, n);
    }));

    vscode.window.onDidChangeTextEditorSelection(() => {
        scrollPosition = Scroll.Center;
    });
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".recenter", () => {
        const editor = vscode.window.activeTextEditor;
        const pos = editor.selection.active;
        const line = editor.document.lineAt(pos.line);
        vscode.commands.executeCommand('revealLine', {
            'lineNumber': line.lineNumber,
            'at': 'center',
        });
    }));
}
