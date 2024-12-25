// https://wolfgangrittner.dev/how-to-use-clipboard-api-in-firefox/

export const copyToClipboard = async (valueToCopy: string | (() => Promise<string | null>)) => {
  const deferredText = typeof valueToCopy === 'string' ? () => Promise.resolve(valueToCopy) : valueToCopy;

  if (typeof ClipboardItem && navigator.clipboard.write) {
    /**
     NOTE: Safari locks down the clipboard API to only work when triggered
     by a direct user interaction. You can't use it async in a promise.
     But! You can wrap the promise in a ClipboardItem, and give that to
     the clipboard API.
     Found this on https://developer.apple.com/forums/thread/691873
     */

    const clipboardItem = new ClipboardItem({
      'text/plain': deferredText().then((text) => new Blob([text ?? ''], { type: 'text/plain' })),
    });

    return navigator.clipboard.write([clipboardItem]);
  }

  /**
   NOTE: Firefox has support for ClipboardItem and navigator.clipboard.write,
   but those are behind `dom.events.asyncClipboard.clipboardItem` preference.
   Good news is that other than Safari, Firefox does not care about
   Clipboard API being used async in a Promise.
   */

  const text = await deferredText();

  return navigator.clipboard.writeText(text ?? '');
};
