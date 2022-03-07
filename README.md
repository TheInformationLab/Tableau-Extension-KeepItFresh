<div align="center">
<img src="https://img.shields.io/github/license/TheInformationLab/Tableau-Extension-KeepItFresh" />
<img src="https://img.shields.io/github/languages/top/TheInformationLab/Tableau-Extension-KeepItFresh" />
</div>
<div align="center">
<img src="https://img.shields.io/github/package-json/dependency-version/TheInformationLab/Tableau-Extension-KeepItFresh/react?filename=package.json" />
<img src="https://img.shields.io/github/package-json/dependency-version/TheInformationLab/Tableau-Extension-KeepItFresh/@tableau/tableau-ui?filename=package.json" />
<img src="https://img.shields.io/github/package-json/dependency-version/TheInformationLab/Tableau-Extension-KeepItFresh/react-router-dom?filename=package.json" />

</div>

# Tableau-Extension-KeepItFresh

Author: [Andre de Vries](https://github.com/andre347)
Date: August 2019

Refreshing data in a dashboard on a timer is something that many Tableau users would like to do. However, not everyone got the skills or time to use the JavaScript API or wants to hack around with Web Data Connectors. Now there is another solution! With the Keep it Fresh Extension you can refresh your data on a specific time interval. Select your data sources, specify a time value and a countdown clock will appear on your dashboard. Want to style the countdown clock? We got you sorted. You can set it to whatever colour matches your dashboard!

This extension is of course free to download and use.

## Update 7th of March 2022

This extension is now also available as a Docker image. I have also created quick starts for self hosting via Render or Heroku. Use the instructions below to self-host this extension.

### Quick start

#### Deploy to Heroku

1. One click deploy to Heroku
   [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/TheInformationLab/Tableau-Extension-KeepItFresh)

1. Note if you don't have an account, you'll be prompted to signup for Heroku. It's free to deploy this Tableau extension.

#### Deploy to Render

Clone the repository, and then use the deploy button
</br></br>
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Use the Docker image

```zsh
docker pull andre347/keep-it-fresh-tableau-extension
```

```zsh
docker run -d -p 3000:3000 andre347/keep-it-fresh-tableau-extension
```
