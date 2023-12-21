<script lang="ts">
	import '../app.pcss';
	import { onMount } from 'svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import * as Command from '$lib/components/ui/command';
	import { Button } from '$lib/components/ui/button';

	import { Sun, Moon, Search } from 'lucide-svelte';

	let open = false;
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<ModeWatcher />

<!-- Command Menu -->
<Command.Dialog bind:open>
	<Command.Input placeholder="Search for anything..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>Calendar</Command.Item>
			<Command.Item>Search Emoji</Command.Item>
			<Command.Item>Calculator</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>

<div class="p-3">
	<nav class="flex items-center justify-between gap-3">
		<Button href="/" variant="ghost" class="font-bold">quranic</Button>

		<Button
			on:click={() => (open = !open)}
			variant="outline"
			class="flex w-3/5 items-center justify-between text-muted-foreground"
		>
			<div class="inline-flex items-center gap-3">
				<Search class="p-1" />
				<span class="text-sm">Search for anything...</span>
			</div>

			<kbd
				class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100"
			>
				<span class="text-xs">⌘</span>K
			</kbd>
		</Button>

		<Button on:click={toggleMode} variant="ghost" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</nav>
	<main>
		<slot />
	</main>
</div>
