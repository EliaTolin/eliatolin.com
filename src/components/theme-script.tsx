const STORAGE_KEY = 'theme'

// Runs before first paint, so the page never flashes the wrong theme.
// Kept dependency-free and inline on purpose — an external file would load too
// late to prevent the flash.
const script = `(function(){try{
var root=document.documentElement;
var stored=localStorage.getItem('${STORAGE_KEY}');
var query=window.matchMedia('(prefers-color-scheme: dark)');
function apply(dark){root.classList.toggle('dark',dark);root.style.colorScheme=dark?'dark':'light'}
apply(stored==='dark'||(!stored&&query.matches));
query.addEventListener('change',function(e){if(!localStorage.getItem('${STORAGE_KEY}'))apply(e.matches)});
}catch(e){}})()`

export function ThemeScript() {
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />
}

export { STORAGE_KEY as THEME_STORAGE_KEY }
