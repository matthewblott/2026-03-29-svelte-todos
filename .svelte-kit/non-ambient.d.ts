
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/[tenant]" | "/[tenant]/auth" | "/[tenant]/auth/login" | "/[tenant]/auth/verify" | "/[tenant]/todos";
		RouteParams(): {
			"/[tenant]": { tenant: string };
			"/[tenant]/auth": { tenant: string };
			"/[tenant]/auth/login": { tenant: string };
			"/[tenant]/auth/verify": { tenant: string };
			"/[tenant]/todos": { tenant: string }
		};
		LayoutParams(): {
			"/": { tenant?: string };
			"/[tenant]": { tenant: string };
			"/[tenant]/auth": { tenant: string };
			"/[tenant]/auth/login": { tenant: string };
			"/[tenant]/auth/verify": { tenant: string };
			"/[tenant]/todos": { tenant: string }
		};
		Pathname(): "/" | `/${string}/auth/login` & {} | `/${string}/auth/verify` & {} | `/${string}/todos` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}