The _openvidu.io_ documentation is generated with [MkDocs](http://www.mkdocs.org). 

You can edit any page or add a new one with a simple text using the Markdown format.

# How to edit OpenVidu documentation

- Clone this repository
```
git clone https://github.com/OpenVidu/openvidu.io-docs
```
- Go to repository and open `/docs` folder.
- Create a new Markdown file (.md) into an existent folder. You can create a new document category creating a new folder. The folder name will be category name. You will have to update `mkdocs.yml` file adding a new element into `nav` property if you want to link your new file from the navigation menu.
- Edit that file and add content in [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).


- In order to preview the complete _openvidu.io_ web with the docs already integrated and your changes properly added:
	- Clone the repo `https://github.com/OpenVidu/openvidu.io` in the same path as repository `openvidu.io-docs` and serve it with Docker:
	```
	git clone https://github.com/OpenVidu/openvidu.io
	cd openvidu.io
	docker run --rm --volume=$PWD:/srv/jekyll -p 4000:4000 -it jekyll/jekyll:4.0.0 jekyll serve
	```
	(Run `fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` to increase the number of files that can be monitored if any problem appears when running this docker container)
	
	- Run `openvidu.io-docs/generate.sh` script, which will build Mkdocs files and will put them in `openvidu.io/docs` folder (this is why we need _openvidu.io_ and _openvidu.io-docs_ repositories at the same path). You will need `mkdocs` (here we use **python3**):
	```bash
	# Python 3
	sudo apt-get update && sudo apt-get -y upgrade
	sudo apt install -y python3-pip
	```
	```bash
	# Latest Mkdocs
	sudo pip3 install mkdocs==1.0.4
	```
	
	- Visit [`http://localhost:4000`](http://localhost:4000) in order to preview _openvidu.io_ web with your new documentation integrated. Whenever you update a file in `openvidu.io-docs/docs` folder, you can relaunch `generate.sh` script to update _openvidu.io_ web served by Jekyll's Docker container, listening in localhost:4000)
