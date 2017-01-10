'use strict';
import * as vscode from 'vscode';

import { activateMark } from './mark';
import { activateKillring } from './killring';
import { activateText } from './text';

export interface ExtensionInternal {
}

export function activate(context: vscode.ExtensionContext) {   
    activateMark(context);
    activateKillring(context);
    activateText(context);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

