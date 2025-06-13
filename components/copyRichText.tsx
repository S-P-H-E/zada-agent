import { marked } from 'marked';

export async function copyAsRichText(output: string) {
    const html = await marked.parse(output);
  
    // Clean formatting except <a> tags
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    wrapper.querySelectorAll('*:not(a)').forEach((node) => {
      node.removeAttribute('style');
      node.removeAttribute('class');
    });
  
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([wrapper.innerHTML], { type: 'text/html' }),
          'text/plain': new Blob([output], { type: 'text/plain' }),
        }),
      ]);

    // toast.success('Copied to clipboard.')
    // add a toast above 
    
    } catch (err) {
      console.error('Clipboard write failed:', err);
    }
  }