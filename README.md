The _openvidu.io_ documentation is generated with [MkDocs](http://www.mkdocs.org). 

You can edit any page or add a new one with a simple text using the Markdown format.

# How to add a new page

- Clone this repository
```
git clone https://github.com/OpenVidu/openvidu.io-docs
```
- Go to repository and open `/docs` folder.
- Create a new Markdown file (.md) into an existent folder. You can create a new document category creating a new folder. The folder name will be category name.
- Edit that file and add content in [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
- If you want to preview the changes locally, you can execute the following command in the root folder of the repository (you need [Docker](https://store.docker.com/search?type=edition&offering=community) installed) and open the browser in [`http://localhost:8000`](http://localhost:8000):

```
docker run -it --rm -v `pwd`:/docs -p 8000:8000 coding2012/mkdocs serve -a 0.0.0.0:8000
```

- In order to preview the complete _openvidu.io_ web with the docs integrated:
	- Clone the repo `https://github.com/OpenVidu/openvidu.io` in the same path as `openvidu.io-docs` and serve it with Docker:
	```
	git clone https://github.com/OpenVidu/openvidu.io
	cd openvidu.io
	docker run --rm --volume=$PWD:/srv/jekyll -p 4000:4000 -it jekyll/jekyll:3.4.3 jekyll serve 
	```
	(Run `fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` to increase the number of files that can be monitored if any problem appears when running this docker container)
	
	- Run `openvidu.io-docs/generate-dev.sh` script, which will build Mkdocs files and will put them in `openvidu.io/docs` folder (this is why we need _openvidu.io_ and _openvidu.io-docs_ repos at the same path). You will need `mkdocs`:
	```
	sudo apt-get install python-pip
	sudo pip install mkdocs==0.16.3
	```
	(Append `--user` to the pip  command if any problem with permissions)
	
	- Visit [`http://localhost:4000`](http://localhost:4000) in order to preview _openvidu.io_ web with your new documentation integrated. Whenever you update a file in `openvidu.io-docs/docs` folder, you can relaunch `generate-dev.sh` script to update _openvidu.io_ web served by Jekyll's Docker container, listening in localhost:4000)
