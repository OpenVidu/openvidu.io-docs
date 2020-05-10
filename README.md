OpenVidu documentation is generated with [MkDocs](http://www.mkdocs.org) and hosted in [Read the Docs](https://readthedocs.org/).

You can edit any page or add a new one with a simple text using the Markdown format.

# How to edit OpenVidu documentation

- Clone this repository

```bash
git clone https://github.com/OpenVidu/openvidu.io-docs
```

- cd into `/docs` folder.
- Create a new Markdown file (.md) into an existent folder. You can create a new document category creating a new folder. The folder name will be category name. You will have to update `mkdocs.yml` file adding a new element as a `nav` child if you want to link your new file from the navigation menu.
- Edit that file and add content in [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
- In order to preview the documentation, you will need Python 3 and Mkdocs:

```bash
# Python 3
sudo apt-get update && sudo apt-get -y upgrade
sudo apt install -y python3-pip
```
```bash
# Latest Mkdocs
sudo pip3 install mkdocs==1.1
```

Then run the following command in the root of the project `openvidu.io-docs/.`

```bash
mkdocs serve
```

You will have the documentation available in [http://localhost:8000](http://localhost:8000).
