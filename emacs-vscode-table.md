# Emacs -- vs-code Correspondence table

Based on *The Emacs Editor* manual. https://www.gnu.org/software/emacs/manual/


status meaning

- built-in: vscode already has same(or nearly) function
- this: This *emacs-functions extension* provide function.
- overwrite: This *emacs-function extension* overwrite built-in extension with extension.emacs namespace.
- blank: not yet researched. PR is always welcome!

## 6 Exiting Emacs

https://www.gnu.org/software/emacs/manual/html_node/emacs/Exiting.html#Exiting

| Emacs default key | emacs funcname             | vs code func name                | status   |
|:------------------|:---------------------------|:---------------------------------|:---------|
| C-x C-c           | save-buffers-kill-terminal | workbench.action.closeAllEditors | built-in |
| C-z               | suspend-emacs              |                                  |          |


## 7.2 Changing the Location of Point

https://www.gnu.org/software/emacs/manual/html_node/emacs/Moving-Point.html#Moving-Point

| Emacs default key | emacs funcname                 | vs code func name               | status    |
|:------------------|:-------------------------------|:--------------------------------|:----------|
| C-f               | forward-char                   | extension.emacs.cursorRight     | overwrite |
| RIGHT             | right-char                     | extension.emacs.cursorRight     | overwrite |
| C-b               | backward-char                  | extension.emacs.cursorLeft      | overwrite |
| LEFT              | left-char                      | extension.emacs.cursorLeft      | overwrite |
| C-n/DOWN          | next-line                      | extension.emacs.cursorUp        | overwrite |
| C-p/UP            | previous-line                  | extension.emacs.cursorDown      | overwrite |
| C-a/Home          | move-beginning-of-line         | extension.emacs.cursorHome      | overwrite |
| C-e/End           | move-end-of-line               | extension.emacs.cursorEnd       | overwrite |
| M-f               | forward-word                   | extension.emacs.cursorWordRight | overwrite |
| C-RIGHT/M-RIGHT   | right-word                     | extension.emacs.cursorWordRight | overwrite |
| M-b               | backward-word                  | extension.emacs.cursorWordLeft  | overwrite |
| C-LEFT/M-LEFT     | left-word                      | extension.emacs.cursorWordLeft  | overwrite |
| M-r               | move-to-window-line-top-bottom |                                 |           |
| M-<               | beginning-of-buffer            | extension.emacs.cursorTop       | overwrite |
| M->               | end-of-buffer                  | extension.emacs.cursorDown      | overwrite |
| C-v/PageDown/next | scroll-up-command              | extension.emacs.cursorPageUp    | overwrite |
| M-v/PageUp/prior  | scroll-down-command            | extension.emacs.cursorPageDown  | overwrite |


## 7.3 Erasing Text

https://www.gnu.org/software/emacs/manual/html_node/emacs/Erasing.html#Erasing

| Emacs default key | emacs funcname       | vs code func name                  | status   |
|:------------------|:---------------------|:-----------------------------------|:---------|
| DEL/BACKSPACE     | delete-backward-char | deleteLeft                         | built-in |
| Delete            | delete-forward-char  | deleteRight                        | built-in |
| C-d               | delete-char          | extension.emacs.delete-char        | this     |
| C-k               | kill-line            | extension.emacs.kill-line          | this     |
| M-d               | kill-word            | extension.emacs.kill-word          | this     |
| M-DEL             | backward-kill-word   | extension.emacs.backward-kill-word | this     |

## 7.4 Undoing Changes

https://www.gnu.org/software/emacs/manual/html_node/emacs/Basic-Undo.html#Basic-Undo

| Emacs default key | emacs funcname | vs code func name | status   |
|:------------------|:---------------|:------------------|:---------|
| C-/               | undo           | undo              | built-in |
| C-x u             | The same       | The same          | built-in |
| C-_               | The same       | The same          | built-in |


## 11.1 Setting the Mark

https://www.gnu.org/software/emacs/manual/html_node/emacs/Setting-Mark.html#Setting-Mark

| Emacs default key | emacs funcname          | vs code func name                | status |
|:------------------|:------------------------|:---------------------------------|:-------|
| C-SPC             | set-mark-command        | extension.emacs.set-mark-command | this   |
| C-@               | The same                | The same                         | this   |
| C-x C-x           | exchange-point-and-mark |                                  |        |
| mouse-3           | mouse-save-then-kill    |                                  |        |
| C-g               |                         | extension.emacs.cancelSelection  | this   |


## 12.2 Yanking

https://www.gnu.org/software/emacs/manual/html_node/emacs/Yanking.html


| Emacs default key | emacs funcname   | vs code func name              | status |
|:------------------|:-----------------|:-------------------------------|:-------|
| C-y               | yank             | extension.emacs.yank           | this   |
| M-y               | yank-pop         |                                | this   |
| C-M-w             | append-next-kill |                                | this   |
| C-w               | kill-region      | extension.emacs.kill-region    | this   |
| M-w               | kill-ring-save   | extension.emacs.kill-ring-save | this   |

### 18.2 Visiting Files

https://www.gnu.org/software/emacs/manual/html_node/emacs/Visiting.html#Visiting

| Emacs default key | emacs funcname         | vs code func name                     | status   |
|:------------------|:-----------------------|:--------------------------------------|:---------|
| C-x C-f           | find-file              | workbench.action.files.openFileFolder | built-in |
| C-x C-r           | find-file-read-only    |                                       |          |
| C-x C-v           | find-alternate-file    |                                       |          |
| C-x 4 f           | find-file-other-window |                                       |          |
| C-x 5 f           | find-file-other-frame  |                                       |          |
