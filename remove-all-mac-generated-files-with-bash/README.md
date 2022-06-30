Remove all Mac generated files '._' with bash


sudo find . -name "._*" -exec rm -rf {} \;
