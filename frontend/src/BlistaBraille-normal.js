﻿import { jsPDF } from "jspdf"
export var font = 'AAEAAAANAIAAAwBQT1MvMhmIQZcAAADcAAAATmNtYXBdmh8VAAABLAAABUJjdnQgLQUqQgAABnAAAABcZnBnbQIRwmEAAAbMAAAB2GdseWbnwgkSAAAIpAAAMPRoZWFk4WTviQAAOZgAAAA2aGhlYQ0VBTcAADnQAAAAJGhtdHgw2CNyAAA59AAAAIxsb2NhpyWzGAAAOoAAAACIbWF4cADuAL0AADsIAAAAIG5hbWWes0BcAAA7KAAAAidwb3N0XiYp8QAAPVAAAAIlcHJlcPbUmBMAAD94AAAAIgAABicBkAAFAAABmgFxAAAAAAGaAXEAAAXrAGYCEgwABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAICZrBev98wAABzMCDQAAAAAAAgABAAAAAAAUAAMAAQAAARoAAAEGAAABAAAAAAAAAABCAAAAAQAAAAAAAAAAAAAAAAAAAAAAAEI/OzY+CAlBKzk4KSM6MzE3IhMfHiEQDxIvMCRAKjwyNQMEHB0gDQ4RLC0UBRUWGQYHCiUmGwwuGBcaCzQnKD01AwQcHSANDhEsLRQFFRYZBgcKJSYbDC4YFxoLNCcoPTxCOkITJA0OMyxBIyQwEhAQKisUBSMkGjAPMgdBDyoIAjo/Pj4+IDg7CRFAMToKPD0pBBxAFR0zQQMtPBsMGDMrIyI3QDY7BzgIEyk/MB8qOTE/MR4yOCUtOTIhKzkpNgsiIjc1NjsJKAgTEDQfHw8mFjceHhkvEi8nISESLgYXAAQEKAAAAAYABAABAAIA/yj///8AAAAAKAD//wAAAAAAAQAGAgQAAAABAAAAAAAAAAAAAAAAAAAAAABCAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgA/ADsANgA+AAgACQBBACsAOQA4ACkAIwA6ADMAMQA3ACIAEwAfAB4AIQAQAA8AEgAvADAAJABAACoAPAAyADUAAwAEABwAHQAgAA0ADgARACwALQAUAAUAFQAWABkABgAHAAoAJQAmABsADAAuABgAFwAaAAsANAAnACgAPQA1AAMABAAcAB0AIAANAA4AEQAsAC0AFAAFABUAFgAZAAYABwAKACUAJgAbAAwALgAYABcAGgALADQAJwAoAD0APABCADoAQgATACQADQAOADMALABBACMAJAAwABIAEAAQACoAKwAUAAUAIwAkABoAMAAPADIABwBBAA8AKgAIAAIAOgA/AD4APgA+ACAAOAA7AAkAEQBAADEAOgAKADwAPQApAAQAHABAABUAHQAzAEEAAwAtADwAGwAMABgAMwArACMAIgA3AEAANgA7AAcAOAAIABMAKQA/ADAAHwAqADkAMQA/ADEAHgAyADgAJQAtADkAMgAhACsAOQApADYACwAiACIANwA1ADYAOwAJACgACAATABAANAAfAB8ADwAmABYANwAeAB4AGQAvABIALwAnACEAIQASAC4ABgAXAEIAAwAjAAQAMwAUACQABQA7ABwALAANADQAFQAlAAYAPwAgADAAEQA4ABkAKQAKADwAHQAtAA4ANQAWACYABwBBACIAMgATADoAGwArAAwAPgAfAC8AEAA3ABgAKAAJAEAAIQAxABIAOQAaACoACwA9AB4ALgAPADYAFwAnAAgAQgADACMABAAzABQAJAAFADsAHAAsAA0ANAAVACUABgA/ACAAMAARADgAGQApAAoAPAAdAC0ADgA1ABYAJgAHAEEAIgAyABMAOgAbACsADAA+AB8ALwAQADcAGAAoAAkAQAAhADEAEgA5ABoAKgALAD0AHgAuAA8ANgAXACcACABCAAMAIwAEADMAFAAkAAUAOwAcACwADQA0ABUAJQAGAD8AIAAwABEAOAAZACkACgA8AB0ALQAOADUAFgAmAAcAQQAiADIAEwA6ABsAKwAMAD4AHwAvABAANwAYACgACQBAACEAMQASADkAGgAqAAsAPQAeAC4ADwA2ABcAJwAIAEIAAwAjAAQAMwAUACQABQA7ABwALAANADQAFQAlAAYAPwAgADAAEQA4ABkAKQAKADwAHQAtAA4ANQAWACYABwBBACIAMgATADoAGwArAAwAPgAfAC8AEAA3ABgAKAAJAEAAIQAxABIAOQAaACoACwA9AB4ALgAPADYAFwAnAAgAAAAGAAYADAAKABYAGP/+AAD//AAABecF6wGLAYgBhwGEAYMAxgDEAMIAbwAgA7MDsgOyA68DrwOuA64DrQOrA6oDqgOpA6kDqAJMAdgB1QGFAYUBhAGEAMMASgAgQBYVFBMSERAPDg0MCwoJCAcGBQQDAgEALLIAgABDIIpiiiNCZlYtLLIqAABDVHiwACtYFzlZsAArWBc8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';
var callAddFont = function () {
this.addFileToVFS('BlistaBraille-normal.ttf', font);
this.addFont('BlistaBraille-normal.ttf', 'BlistaBraille', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
