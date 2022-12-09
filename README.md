# Bit Workspace for DST Projects

## Quick Start

- install bit on your machine here https://bit.dev/docs/getting-started/installing-bit/installing-bit . this can take some time to install.
- run 
```bash
npm config set '@psa:registry' https://node.bit.cloud
```
in your terminal to add this remote repo to your global npm registry
- run 
```bash
bit install
```
and then 
```bash
  bit start
````
and open [localhost:3000](http://localhost:3000). It may take a while to build the first time you run this command as it is building the whole User Interface for your development environment.


##What's included

- **dst/**

including all developed components

- **dst/ui**

contains all user interface components used in DST projects

- **dst/env**

contains env components to control build environment of other react components

- **.gitignore**

Ignoring any files from version control

- **workspace.jsonc**

This is the main configuration file of your bit workspace. Here you can modify the workspace name and icon as well as default directory and scope. It is where dependencies are found when you install anything. It is also where you register aspects, bit extensions as well as apply the environments for your components. This workspace has been setup so that all components use the React env. However you can create other components and apply other envs to them such as node, html, angular and aspect envs.

- **.bitmap**

This is an auto-generated file and includes the mapping of your components. There is one component included here. In order to remove this component you can run the following command.
