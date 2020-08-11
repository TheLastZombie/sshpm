# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Updated NPM keywords

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

[Unreleased]: https://github.com/TheLastZombie/sshpm/compare/0.3.0...HEAD
[0.3.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.3.0
[0.2.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.2.0
[0.1.0]: https://github.com/TheLastZombie/sshpm/releases/tag/0.1.0
