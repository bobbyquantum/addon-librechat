# LibreChat add-on repository

## Add-ons

This repository contains the following add-ons:

- **LibreChat v0.8.0-rc2** - Open-source AI chat platform
- **RAG API v0.5.0** - RAG API for enhanced chat capabilities

### [LibreChat add-on](./librechat)

![Supports amd64 Architecture][amd64-shield]

_LibreChat add-on._

<!--

Notes to developers after forking or using the github template feature:
- While developing comment out the 'image' key from 'example/config.yaml' to make the supervisor build the addon
  - Remember to put this back when pushing up your changes.
- When you merge to the 'main' branch of your repository a new build will be triggered.
  - Make sure you adjust the 'version' key in 'example/config.yaml' when you do that.
  - Make sure you update 'example/CHANGELOG.md' when you do that.
  - The first time this runs you might need to adjust the image configuration on github container registry to make it public
  - You may also need to adjust the github Actions configuration (Settings > Actions > General > Workflow > Read & Write)
- Adjust the 'image' key in 'example/config.yaml' so it points to your username instead of 'home-assistant'.
  - This is where the build images will be published to.
- Rename the example directory.
  - The 'slug' key in 'example/config.yaml' should match the directory name.
- Adjust all keys/url's that points to 'home-assistant' to now point to your user/fork.
- Share your repository on the forums https://community.home-assistant.io/c/projects/9
- Do awesome stuff!
 -->

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg


### [RAG API add-on](./rag_api)

![Supports amd64 Architecture][amd64-shield]

_RAG API add-on._

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
