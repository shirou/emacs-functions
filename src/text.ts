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
		if (scrollPosition === Scroll.Center) {
			vscode.window.activeTextEditor.revealRange(
				vscode.window.activeTextEditor.selection,
				vscode.TextEditorRevealType.InCenter
			);
			scrollPosition = Scroll.Top;
		} else if (scrollPosition === Scroll.Top) {
			let promises = [
				vscode.commands.executeCommand("scrollPageDown"),
				vscode.commands.executeCommand("scrollPageDown")
			];

			Promise.all(promises).then(() => {
				vscode.window.activeTextEditor.revealRange(
					vscode.window.activeTextEditor.selection,
					vscode.TextEditorRevealType.Default
				);
				scrollPosition = Scroll.Bottom;
			});
		} else if (scrollPosition === Scroll.Bottom) {
			let promises = [
				vscode.commands.executeCommand("scrollPageUp"),
				vscode.commands.executeCommand("scrollPageUp")
			];

			Promise.all(promises).then(() => {
				vscode.window.activeTextEditor.revealRange(
					vscode.window.activeTextEditor.selection,
					vscode.TextEditorRevealType.Default
				);
				scrollPosition = Scroll.Center;
			});
		}
	}));
}
