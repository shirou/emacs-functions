'use strict';
import * as vscode from 'vscode';

import { activateMark } from './mark';
import { activateKillring } from './killring

export function activate(context: vscode.ExtensionContext) {   
    activateMark(context);
    activateKillring(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

