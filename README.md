Installation instructions
=========================

Install nodejs such that node is in your PATH
Install git such that git is in your PATH

git clone https://github.com/Aharon-Porath/Democrasee.git
cd Democrasee
# install all node requirements
npm install
# create mongo db root if it doesn't exist
[ -e .data ] || mkdir .data
# mongo run
## windows
RunMongo.bat
## linux
./RunMongo.sh

# Launching on port 8080
PORT=8080 node app.js
# Launching on port 80
node app.js


