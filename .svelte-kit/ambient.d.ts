
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SMTP_HOST: string;
	export const SMTP_PORT: string;
	export const SMTP_USER: string;
	export const SMTP_PASS: string;
	export const SMTP_FROM: string;
	export const SHELL: string;
	export const npm_command: string;
	export const LESSHISTFILE: string;
	export const GHOSTTY_BIN_DIR: string;
	export const RUBY_CONFIGURE_OPTS: string;
	export const COLORTERM: string;
	export const XPC_FLAGS: string;
	export const TERM_PROGRAM_VERSION: string;
	export const TMUX: string;
	export const NODE: string;
	export const __CFBundleIdentifier: string;
	export const JAVA_HOME: string;
	export const DOTNET_ROOT: string;
	export const SSH_AUTH_SOCK: string;
	export const XDG_DATA_HOME: string;
	export const GEMINI_API_KEY: string;
	export const XDG_CONFIG_HOME: string;
	export const TLDR_CACHE_DIR: string;
	export const TMUX_PLUGIN_MANAGER_PATH: string;
	export const OSLogRateLimit: string;
	export const ANDROID_SDK_HOME: string;
	export const npm_config_local_prefix: string;
	export const REDISCLI_HISTFILE: string;
	export const documents: string;
	export const EDITOR: string;
	export const PWD: string;
	export const LOGNAME: string;
	export const MANPATH: string;
	export const LaunchInstanceID: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const DOTNET_MULTILEVEL_LOOKUP: string;
	export const COMMAND_MODE: string;
	export const GHOSTTY_SHELL_FEATURES: string;
	export const HOME: string;
	export const LANG: string;
	export const HISTFILE: string;
	export const npm_package_version: string;
	export const ERRFILE: string;
	export const SECURITYSESSIONID: string;
	export const STARSHIP_SHELL: string;
	export const STARSHIP_CONFIG: string;
	export const __MISE_DIFF: string;
	export const TMPDIR: string;
	export const __MISE_SHIM: string;
	export const STARSHIP_SESSION_KEY: string;
	export const __MISE_ORIG_PATH: string;
	export const XDG_CACHE_HOME: string;
	export const npm_lifecycle_script: string;
	export const CONTEXT7_API_KEY: string;
	export const W3M_DIR: string;
	export const GRADLE_USER_HOME: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const ANDROID_AVD_HOME: string;
	export const ANDROID_HOME: string;
	export const TERM: string;
	export const TERMINFO: string;
	export const npm_package_name: string;
	export const ZDOTDIR: string;
	export const USER: string;
	export const TMUX_PANE: string;
	export const __MISE_SESSION: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const INPUTRC: string;
	export const TASKRC: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_config_user_agent: string;
	export const XDG_STATE_HOME: string;
	export const npm_execpath: string;
	export const npm_package_json: string;
	export const MISE_SHELL: string;
	export const XDG_DATA_DIRS: string;
	export const SQLITE_HISTORY: string;
	export const PATH: string;
	export const HISTIGNORE: string;
	export const OPENCODE_API_KEY: string;
	export const tmux_version: string;
	export const npm_node_execpath: string;
	export const OLDPWD: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SMTP_HOST: string;
		SMTP_PORT: string;
		SMTP_USER: string;
		SMTP_PASS: string;
		SMTP_FROM: string;
		SHELL: string;
		npm_command: string;
		LESSHISTFILE: string;
		GHOSTTY_BIN_DIR: string;
		RUBY_CONFIGURE_OPTS: string;
		COLORTERM: string;
		XPC_FLAGS: string;
		TERM_PROGRAM_VERSION: string;
		TMUX: string;
		NODE: string;
		__CFBundleIdentifier: string;
		JAVA_HOME: string;
		DOTNET_ROOT: string;
		SSH_AUTH_SOCK: string;
		XDG_DATA_HOME: string;
		GEMINI_API_KEY: string;
		XDG_CONFIG_HOME: string;
		TLDR_CACHE_DIR: string;
		TMUX_PLUGIN_MANAGER_PATH: string;
		OSLogRateLimit: string;
		ANDROID_SDK_HOME: string;
		npm_config_local_prefix: string;
		REDISCLI_HISTFILE: string;
		documents: string;
		EDITOR: string;
		PWD: string;
		LOGNAME: string;
		MANPATH: string;
		LaunchInstanceID: string;
		_: string;
		XAUTHORITY: string;
		DOTNET_MULTILEVEL_LOOKUP: string;
		COMMAND_MODE: string;
		GHOSTTY_SHELL_FEATURES: string;
		HOME: string;
		LANG: string;
		HISTFILE: string;
		npm_package_version: string;
		ERRFILE: string;
		SECURITYSESSIONID: string;
		STARSHIP_SHELL: string;
		STARSHIP_CONFIG: string;
		__MISE_DIFF: string;
		TMPDIR: string;
		__MISE_SHIM: string;
		STARSHIP_SESSION_KEY: string;
		__MISE_ORIG_PATH: string;
		XDG_CACHE_HOME: string;
		npm_lifecycle_script: string;
		CONTEXT7_API_KEY: string;
		W3M_DIR: string;
		GRADLE_USER_HOME: string;
		GHOSTTY_RESOURCES_DIR: string;
		ANDROID_AVD_HOME: string;
		ANDROID_HOME: string;
		TERM: string;
		TERMINFO: string;
		npm_package_name: string;
		ZDOTDIR: string;
		USER: string;
		TMUX_PANE: string;
		__MISE_SESSION: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		INPUTRC: string;
		TASKRC: string;
		XPC_SERVICE_NAME: string;
		npm_config_user_agent: string;
		XDG_STATE_HOME: string;
		npm_execpath: string;
		npm_package_json: string;
		MISE_SHELL: string;
		XDG_DATA_DIRS: string;
		SQLITE_HISTORY: string;
		PATH: string;
		HISTIGNORE: string;
		OPENCODE_API_KEY: string;
		tmux_version: string;
		npm_node_execpath: string;
		OLDPWD: string;
		__CF_USER_TEXT_ENCODING: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
