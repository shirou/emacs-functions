'use strict';
import * as vscode from 'vscode';

import { ExtPrefix } from './constants'; 

export function activateText(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".back-to-indentation", () => {
        let editor = vscode.window.activeTextEditor;

        const pos = editor.selection.active;
        const line = editor.document.lineAt(pos.line);
        const n = new vscode.Position(pos.line, line.firstNonWhitespaceCharacterIndex);
        editor.selection = new vscode.Selection(n, n);
    }));
}

