'use strict';
import * as vscode from 'vscode';

import { activateMark } from './mark';

export function activate(context: vscode.ExtensionContext) {   
    activateMark(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

