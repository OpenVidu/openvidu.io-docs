OpenVidu documentation is generated with [MkDocs](https://www.mkdocs.org/) and hosted in [Read the Docs](https://readthedocs.org/).

You can edit any page or add a new one with a simple text using the Markdown format.

# How to edit OpenVidu documentation

- Clone this repository and change into the docs folder:

  ```bash
  git clone https://github.com/OpenVidu/openvidu.io-docs
  cd openvidu.io-docs/docs/
  ```

- To add new pages, create a new Markdown file (*.md*) into an existing folder.

- To add new document categories, create a new folder; the folder name will become the category name. You will have to update `mkdocs.yml` by adding a new element as a `nav` child if you want to link your new file from the navigation menu.

- Edit your new contents in [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

In order to preview the documentation, you will need Python 3 and MkDocs:

```sh
# Install Python 3 and the pip installer
sudo apt-get update && sudo apt-get install --no-install-recommends --yes \
    python3 python3-pip
```

```sh
# Install MkDocs and its dependencies (includes Markdown and an HTTP server)
pip3 install --upgrade -r requirements.txt
export PATH="$HOME/.local/bin:$PATH"
```

Then run the following command in the root of the project (`openvidu.io-docs/`):

```sh
mkdocs serve
```

The newly built documentation will become available at http://127.0.0.1:8000.
