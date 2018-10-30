#!/usr/bin

echo "Make sure you are running this script in from the root folder of the Loggerhead.js project!"
read -p "Do you want to continue? [Y/n]" flag

if [[ $flag == "Y" ]] ; then
  # adapt the .js to be an npm module
  cp ./loggerhead.js ./loggerhead-module/loggerhead-module.js
  echo "" >> ./loggerhead-module/loggerhead-module.js
  echo "exports.Loggerhead = Loggerhead;" >> ./loggerhead-module/loggerhead-module.js

  # adapt the README with the usage for an npm module
  sed "/\/\* Minimal code to get Loggerhead working properly \*\//a \ \ var Loggerhead = require('loggerhead-module').Loggerhead;" ./README.md > loggerhead-module/README.md

  cd ./loggerhead-module
  npm version patch

  echo "---"
  echo "If everything looks good, then don't forget to **publish** the updated npm module!!"
  echo "You can easily do it with the following commands:"
  echo "> cd ./loggerhead-module"
  echo "> npm publish"
  echo "---"
fi
  
exit
