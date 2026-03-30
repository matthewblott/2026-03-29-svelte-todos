
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
		RouteId(): "/(public)" | "/(app)" | "/" | "/(public)/auth" | "/(public)/auth/login" | "/(public)/auth/register" | "/(public)/auth/verify" | "/(app)/[tenant]" | "/(app)/[tenant]/settings" | "/(app)/[tenant]/todos";
		RouteParams(): {
			"/(app)/[tenant]": { tenant: string };
			"/(app)/[tenant]/settings": { tenant: string };
			"/(app)/[tenant]/todos": { tenant: string }
		};
		LayoutParams(): {
			"/(public)": Record<string, never>;
			"/(app)": { tenant?: string };
			"/": { tenant?: string };
			"/(public)/auth": Record<string, never>;
			"/(public)/auth/login": Record<string, never>;
			"/(public)/auth/register": Record<string, never>;
			"/(public)/auth/verify": Record<string, never>;
			"/(app)/[tenant]": { tenant: string };
			"/(app)/[tenant]/settings": { tenant: string };
			"/(app)/[tenant]/todos": { tenant: string }
		};
		Pathname(): "/" | "/auth/login" | "/auth/register" | "/auth/verify" | `/${string}/settings` & {} | `/${string}/todos` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}