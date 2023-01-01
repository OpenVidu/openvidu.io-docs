# OpenVidu documentation

OpenVidu docs are generated with [MkDocs](https://www.mkdocs.org/) and hosted in [Read the Docs](https://readthedocs.org/).

You can edit any page or add a new one, writing text using the [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

The MkDocs theme we're using is a heavily modified version of the stock [mkdocs](https://www.mkdocs.org/user-guide/choosing-your-theme/#mkdocs) theme; it uses HTML template files that are written with the [Jinja template language](https://jinja.palletsprojects.com/en/3.0.x/templates/).


## Editing contents

* Clone this repository and edit your new contents inside the `docs/` folder, using [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

* To add new pages, create a new Markdown file (`.md`) in any of the existing folders.

* To add new document categories, create a new folder; the folder name will become the category name. Then update `mkdocs.yml` by adding a new element as a `nav` child if you want to link your new file from the navigation menu.


### Check spelling

Please use a text editor that provides spell checking and live-preview visualization of Markdown files; this alone will help catching most grammatical and syntactic mistakes. [Visual Studio Code](https://code.visualstudio.com/) is a great option, it provides both of these things, with extensions such as *code-spell-checker*:

```sh
code --install-extension streetsidesoftware.code-spell-checker
```


## Building and previewing

### Install dependencies

You'll need these tools:

* Python 3.
* The *PIP* package installer, used to install MkDocs.
* Optionally, but strongly recommended, the Python's virtual env tool.

```sh
sudo apt-get update && sudo apt-get install --no-install-recommends \
    python3 python3-pip python3-venv
```

To install MkDocs:

```sh
# Create and load the Python virtual environment
python3 -m venv python_modules
source python_modules/bin/activate

# Install MkDocs and its dependencies
python3 -m pip install wheel
python3 -m pip install --upgrade -r requirements.txt
```


### Build docs

Run `mkdocs serve`, and open the newly built files with a web browser:

```sh
# Load the Python virtual environment
source python_modules/bin/activate

# Build and serve the documentation files
mkdocs serve
```

The newly built documentation will become available at http://127.0.0.1:8000/.
