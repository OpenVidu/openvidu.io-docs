if [[ -z "$COPY_STYLES" ]]; then
    echo "Example of use: \"COPY_STYLES=false ./generate.sh\"" 1>&2
    exit 1
fi

if [ "$COPY_STYLES" = true ]; then

    # Check if openvidu.io repository is available next to openvidu.io-docs
    DIR="../openvidu.io/"
    if [ ! -d "$DIR" ]; then
        # openvidu.io does NOT exist. Clone it
        echo "Cloning openvidu.io repository..."
        git clone https://github.com/OpenVidu/openvidu.io.git ../openvidu.io
    fi

    # Clean shared custom theme files
    rm -rf custom_theme/css
    rm -rf custom_theme/fonts
    rm -rf custom_theme/img
    rm -rf custom_theme/js
    rm -rf custom_theme/openvidu-register

    # Copy all required files from openviu.io repository
    cp -R ../openvidu.io/css custom_theme/css
    cp -R ../openvidu.io/fonts custom_theme/fonts
    cp -R ../openvidu.io/img custom_theme/img
    cp -R ../openvidu.io/js custom_theme/js
    cp -R ../openvidu.io/openvidu-register custom_theme/openvidu-register

fi

# Build final static files at ./site
mkdocs build --clean -f mkdocs.yml

