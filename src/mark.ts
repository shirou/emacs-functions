'use strict';
import * as vscode from 'vscode';

import { ExtPrefix } from './constants';

// original : ericmccarthy7 VS Code Mark/Point

export function activateMark(context: vscode.ExtensionContext) {

    let markHandler = new MarkHandler();

    var disposable = vscode.commands.registerCommand(ExtPrefix + '.set-mark-command', () => {
        markHandler.mark(vscode.window.activeTextEditor.selection.active);
    });
    context.subscriptions.push(markHandler);
    context.subscriptions.push(disposable);

    var supportedCursorMoves: string[] = [
        "cursorUp", "cursorDown", "cursorLeft", "cursorRight",
        "cursorHome", "cursorEnd",
        "cursorWordLeft", "cursorWordRight",
        "cursorPageDown", "cursorPageUp",
        "scrollPageDown", "scrollPageUp",
        "scrollLineDown", "scrollLineUp",
        "cursorTop", "cursorBottom"];

    // overwrite built-in functions
    supportedCursorMoves.forEach((cursorMove) => {
       context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + '.' + cursorMove,
           (context) => vscode.commands.executeCommand(markHandler.isMarkMode() ? cursorMove+"Select": cursorMove)))
    });
    context.subscriptions.push(vscode.commands.registerCommand(ExtPrefix + ".cancelSelection", (context) => {
        markHandler.clearMark();
        vscode.commands.executeCommand("cancelSelection");
    }));
}

class MarkHandler {
    private state: boolean = false;
    private posit: vscode.Position;
    public isMarkMode() {
        return this.state;
    }
    public clearMark() {
        this.state = false;
        let editor = vscode.window.activeTextEditor;
        const here = editor.selection.active;
        this.posit = here;
        editor.selection = new vscode.Selection(here, here);
   }
    public mark(pos: vscode.Position) {
        switch (this.state) {
            //add mark
            case false:
                this.posit = pos;
                this.state = true;
                // vscode.window.setStatusBarMessage("Mark created at [" + pos.character + "," + pos.line + "]");
                break;
            //add point and select to it
            case true:
                vscode.window.activeTextEditor.selection = new vscode.Selection(this.posit, pos);
                this.state = false;
                break;
        }
    }
    public dispose(){}
}

export function deactivateMark() {
}
