# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- download command to download optional dependencies
- GitHub Actions badges to documentation

### Changed

- Update dependencies

### Removed

- Pre-built rclone executables

## [1.0.0-rc.1] - 2021-06-06

### Added

- Support for Cyberduck
- import command to import profiles from file
- export command to export profiles to file
- -l flag to log out if connection test fails
- Testing via Jest (including GitHub action)
- Contributor Covenant code of conduct

### Changed

- Update Super-Linter GitHub action
- Update NPM keywords
- Update package-lock.json to version 2
- Update dependencies

### Fixed

- Super-Linter not ignoring .editorconfig file

## [0.6.0] - 2021-01-21

### Added

- Support for FileZilla
- Support for Remmina
- Support for Linux configuration file locations where possible
- --use flag to point to custom sshpm configuration
- Autocompletion generation for bash, Zsh and fish
- Documentation for execution from source without compiling

### Changed

- Error if configuration location could not be determined
- Error if application configuration file is encrypted
- Automatically generate examples for apply command
- Exclude assets from .editorconfig
- Update NPM keywords
- Update license for 2021
- Update dependencies

### Fixed

- Connections not being imported into mRemoteNG if none are available
- Connection details not being imported into WinSCP Portable

## [0.5.0] - 2020-11-02

### Added

- -i flag to create non-existent configuration files
- Automatically sort connections on login

### Changed

- Update ZOC exporter for version 8
- Error if registry entries do not exist
- Ship rclone internally
- Update dependencies
- Extend .gitignore via gitignore.io

### Fixed

- Connections with symbols not being imported into WinSCP
- Markdown not rendering on GitHub Pages
- Super-Linter not ignoring Markdown files

## [0.4.0] - 2020-09-11

### Added

- Support for KiTTY
- Support for mRemoteNG
- Support for rclone
- Super-Linter via GitHub Actions

### Changed

- Split -c into two parameters
- Format for supported programs documentation
- Update NPM keywords
- Update dependencies

### Fixed

- Wrong configuration path being resolved
- Error when looking for non-existent registry keys

## [0.3.0] - 2020-08-11

### Added

- Support for PuTTY
- Support for WinSCP
- Unix-like aliases (touch, ls, rm)
- Documentation for installation with PNPM
- Documentation for installation with Yarn

### Changed

- Make name argument optional for login
- Convert SSH keys automatically using WinSCP.com
- Merge init and reset commands
- Update dependencies

## [0.2.0] - 2020-08-05

### Added

- Examples for every command
- Documentation for execution with NPX
- Documentation for installation with Scoop
- MIT license file
- Keywords for NPM

### Changed

- Always expect OpenSSH key format
- Use absolute path for key files
- NPM website to GitHub Pages link
- Update dependencies

### Fixed

- list command not printing anything
- Re-encoding of ZOC configuration
- Documentation for -o parameter

## [0.1.0] - 2020-08-03

### Added

- Initial release

[Unreleased]: https://github.com/TheLastZombie/sshpm/compare/1.0.0-rc.1...HEAD
[1.0.0-rc.1]: https://github.com/TheLastZombie/sshpm/releases/tag/1.0.0-rc.1
[0.6.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.6.0
[0.5.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.5.0
[0.4.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.4.0
[0.3.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.3.0
[0.2.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.2.0
[0.1.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.1.0
