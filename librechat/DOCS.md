# LibreChat

## Configuration

On first run, the default librechat .env file will be copied to the addon_config/librechat folder.

Edit and restart to customise according to the librechat docs.

https://www.librechat.ai/docs/configuration

If you want to use a librechat yaml, place that into the addon_config/librechat folder and ensure you have the following in your .env file:

```
CONFIG_PATH="/config/librechat.yaml"
```

You should generate new keys using the token here and include them in your config:

https://www.librechat.ai/toolkit

If you leave `CREDS_KEY`, `CREDS_IV`, `JWT_SECRET` or `JWT_REFRESH_SECRET` blank, LibreChat generates them and the add-on keeps them in `addon_config/librechat/.env.temp`. Back that file up: `CREDS_KEY` and `CREDS_IV` encrypt the API keys your users have saved.