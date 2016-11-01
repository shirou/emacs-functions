# emacs-functions

This package aims to provide basic emacs functions to Visual Studio Code with
(almost) same feature.

This provides only `function`, you should make your settings at your
own.


## Settings

Open keyboard shortcut settings and input your settings like this.

```
// Exiting
{ "key": "ctrl+x ctrl-c",           "command": "workbench.action.closeAllEditors" },


// Setting the Mark
{ "key": "ctrl+space",            "command": "extension.emacs.set-mark-command",
                                     "when": "editorTextFocus" },
```

More samples are described in [sample.keyconfig.json](http://github.com/shirou/emacs-functions/blob/master/sample.keyconfig.json).

## Emacs comparison


| Emacs default key | emacs funcname             | vs code func name                | status   |
|:------------------|:---------------------------|:---------------------------------|:---------|
| C-/               | undo                       | undo                             | built-in |
| C-SPC             | set-mark-command           | extension.emacs.set-mark-command | this     |
| C-x C-c           | save-buffers-kill-terminal | workbench.action.closeAllEditors | bu       |
ilt-in |


Full list of Emacs-VS Code comparison tables is [emacs-vscode-table.md](http://github.com/shirou/emacs-functions/blob/master/emacs-vscode-table.md).


## Release Notes

under development.

## License

MIT

## Thanks

- marking point: ericmccarthy7 VS Code Mark/Point
- yanking: https://github.com/hiro-sun/vscode-emacs
