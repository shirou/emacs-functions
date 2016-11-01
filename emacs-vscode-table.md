# Emacs -- vs-code Correspondence table

Based on *The Emacs Editor* manual. https://www.gnu.org/software/emacs/manual/


status meaning

- built-in: vscode already has same(or nearly) function
- this: This *emacs-functions extension* provide function.
- blank: not yet reaseached. PR is always welcome!

## 6 Exiting Emacs

https://www.gnu.org/software/emacs/manual/html_node/emacs/Exiting.html#Exiting

| Emacs default key | emacs funcname             | vs code func name                | status   |
|:------------------|:---------------------------|:---------------------------------|:---------|
| C-x C-c           | save-buffers-kill-terminal | workbench.action.closeAllEditors | built-in |
| C-z               | suspend-emacs              |                                  |          |


## 7.2 Changing the Location of Point

https://www.gnu.org/software/emacs/manual/html_node/emacs/Moving-Point.html#Moving-Point

| Emacs default key | emacs funcname                 | vs code func name | status   |
|:------------------|:-------------------------------|:------------------|:---------|
| C-f               | forward-char                   | cursorRight       | built-in |
| RIGHT             | right-char                     | cursorRight       | built-in |
| C-b               | backward-char                  | cursorLeft        | built-in |
| LEFT              | left-char                      | cursorLeft        | built-in |
| C-n/DOWN          | next-line                      | cursorUp          | built-in |
| C-p/UP            | previous-line                  | cursorDown        | built-in |
| C-a/Home          | move-beginning-of-line         | cursorHome        | built-in |
| C-e/End           | move-end-of-line               | cursorEnd         | built-in |
| M-f               | forward-word                   | cursorWordRight   | built-in |
| C-RIGHT/M-RIGHT   | right-word                     | cursorWordRight   | built-in |
| M-b               | backward-word                  | cursorWordLeft    | built-in |
| C-LEFT/M-LEFT     | left-word                      | cursorWordLeft    | built-in |
| M-r               | move-to-window-line-top-bottom |                   |          |
| M-<               | beginning-of-buffer            | cursorTop         | built-in |
| M->               | end-of-buffer                  | cursorDown        | built-in |
| C-v/PageDown/next | scroll-up-command              | cursorPageUp      | built-in |
| M-v/PageUp/prior  | scroll-down-command            | cursorPageDown    | built-in |


## 7.3 Erasing Text

https://www.gnu.org/software/emacs/manual/html_node/emacs/Erasing.html#Erasing

| Emacs default key | emacs funcname       | vs code func name        | status   |
|:------------------|:---------------------|:-------------------------|:---------|
| DEL/BACKSPACE     | delete-backward-char | deleteLeft               | built-in |
| Delete            | delete-forward-char  | deleteRight              | built-in |
| C-d               | delete-char          | emacs.delete-char        | this     |
| C-k               | kill-line            | emacs.kill-line          | this     |
| M-d               | kill-word            | emacs.kill-word          | this     |
| M-DEL             | backward-kill-word   | emacs.backward-kill-word | this     |

## 7.4 Undoing Changes

https://www.gnu.org/software/emacs/manual/html_node/emacs/Basic-Undo.html#Basic-Undo

| Emacs default key | emacs funcname | vs code func name | status   |
|:------------------|:---------------|:------------------|:---------|
| C-/               | undo           | undo              | built-in |
| C-x u             | The same       | The same          | built-in |
| C-_               | The same       | The same          | built-in |



## 11.1 Setting the Mark

https://www.gnu.org/software/emacs/manual/html_node/emacs/Setting-Mark.html#Setting-Mark

| Emacs default key | emacs funcname          | vs code func name      | status |
|:------------------|:------------------------|:-----------------------|:-------|
| C-SPC             | set-mark-command        | emacs.set-mark-command | this   |
| C-@               | The same                | The same               | this   |
| C-x C-x           | exchange-point-and-mark |                        | no     |
| mouse-3           | mouse-save-then-kill    |                        | no     |


## 12.2 Yanking

https://www.gnu.org/software/emacs/manual/html_node/emacs/Yanking.html


| Emacs default key | emacs funcname   | vs code func name | status  |
|:------------------|:-----------------|:------------------|:--------|
| C-y               | yank             |                   | bult-in |
| M-y               | yank-pop         |                   |         |
| C-M-w             | append-next-kill |                   |         |


### 18.2 Visiting Files

https://www.gnu.org/software/emacs/manual/html_node/emacs/Visiting.html#Visiting

| Emacs default key | emacs funcname         | vs code func name                     | status   |
|:------------------|:-----------------------|:--------------------------------------|:---------|
| C-x C-f           | find-file              | workbench.action.files.openFileFolder | built-in |
| C-x C-r           | find-file-read-only    |                                       |          |
| C-x C-v           | find-alternate-file    |                                       |          |
| C-x 4 f           | find-file-other-window |                                       |          |
| C-x 5 f           | find-file-other-frame  |                                       |          |
