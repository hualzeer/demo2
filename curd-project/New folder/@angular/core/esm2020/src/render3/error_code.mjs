/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ERROR_DETAILS_PAGE_BASE_URL } from './error_details_base_url';
export class RuntimeError extends Error {
    constructor(code, message) {
        super(formatRuntimeError(code, message));
        this.code = code;
    }
}
// Contains a set of error messages that have details guides at angular.io.
// Full list of available error guides can be found at https://angular.io/errors
/* tslint:disable:no-toplevel-property-access */
export const RUNTIME_ERRORS_WITH_GUIDES = new Set([
    "100" /* EXPRESSION_CHANGED_AFTER_CHECKED */,
    "200" /* CYCLIC_DI_DEPENDENCY */,
    "201" /* PROVIDER_NOT_FOUND */,
    "300" /* MULTIPLE_COMPONENTS_MATCH */,
    "301" /* EXPORT_NOT_FOUND */,
    "302" /* PIPE_NOT_FOUND */,
]);
/* tslint:enable:no-toplevel-property-access */
/** Called to format a runtime error */
export function formatRuntimeError(code, message) {
    const fullCode = code ? `NG0${code}: ` : '';
    let errorMessage = `${fullCode}${message}`;
    // Some runtime errors are still thrown without `ngDevMode` (for example
    // `throwProviderNotFoundError`), so we add `ngDevMode` check here to avoid pulling
    // `RUNTIME_ERRORS_WITH_GUIDES` symbol into prod bundles.
    // TODO: revisit all instances where `RuntimeError` is thrown and see if `ngDevMode` can be added
    // there instead to tree-shake more devmode-only code (and eventually remove `ngDevMode` check
    // from this code).
    if (ngDevMode && RUNTIME_ERRORS_WITH_GUIDES.has(code)) {
        errorMessage = `${errorMessage}. Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/NG0${code}`;
    }
    return errorMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JfY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvZXJyb3JfY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQXNDckUsTUFBTSxPQUFPLFlBQWEsU0FBUSxLQUFLO0lBQ3JDLFlBQW1CLElBQXNCLEVBQUUsT0FBZTtRQUN4RCxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFEeEIsU0FBSSxHQUFKLElBQUksQ0FBa0I7SUFFekMsQ0FBQztDQUNGO0FBRUQsMkVBQTJFO0FBQzNFLGdGQUFnRjtBQUNoRixnREFBZ0Q7QUFDaEQsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxHQUFHLENBQUM7Ozs7Ozs7Q0FPakQsQ0FBQyxDQUFDO0FBQ0gsK0NBQStDO0FBRS9DLHVDQUF1QztBQUN2QyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBc0IsRUFBRSxPQUFlO0lBQ3hFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRTVDLElBQUksWUFBWSxHQUFHLEdBQUcsUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDO0lBRTNDLHdFQUF3RTtJQUN4RSxtRkFBbUY7SUFDbkYseURBQXlEO0lBQ3pELGlHQUFpRztJQUNqRyw4RkFBOEY7SUFDOUYsbUJBQW1CO0lBQ25CLElBQUksU0FBUyxJQUFJLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyRCxZQUFZLEdBQUcsR0FBRyxZQUFZLGtCQUFrQiwyQkFBMkIsT0FBTyxJQUFJLEVBQUUsQ0FBQztLQUMxRjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFUlJPUl9ERVRBSUxTX1BBR0VfQkFTRV9VUkx9IGZyb20gJy4vZXJyb3JfZGV0YWlsc19iYXNlX3VybCc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIFJ1bnRpbWVFcnJvckNvZGUge1xuICAvLyBJbnRlcm5hbCBFcnJvcnNcblxuICAvLyBDaGFuZ2UgRGV0ZWN0aW9uIEVycm9yc1xuICBFWFBSRVNTSU9OX0NIQU5HRURfQUZURVJfQ0hFQ0tFRCA9ICcxMDAnLFxuICBSRUNVUlNJVkVfQVBQTElDQVRJT05fUkVGX1RJQ0sgPSAnMTAxJyxcblxuICAvLyBEZXBlbmRlbmN5IEluamVjdGlvbiBFcnJvcnNcbiAgQ1lDTElDX0RJX0RFUEVOREVOQ1kgPSAnMjAwJyxcbiAgUFJPVklERVJfTk9UX0ZPVU5EID0gJzIwMScsXG5cbiAgLy8gVGVtcGxhdGUgRXJyb3JzXG4gIE1VTFRJUExFX0NPTVBPTkVOVFNfTUFUQ0ggPSAnMzAwJyxcbiAgRVhQT1JUX05PVF9GT1VORCA9ICczMDEnLFxuICBQSVBFX05PVF9GT1VORCA9ICczMDInLFxuICBVTktOT1dOX0JJTkRJTkcgPSAnMzAzJyxcbiAgVU5LTk9XTl9FTEVNRU5UID0gJzMwNCcsXG4gIFRFTVBMQVRFX1NUUlVDVFVSRV9FUlJPUiA9ICczMDUnLFxuXG4gIC8vIEJvb3RzdHJhcCBFcnJvcnNcbiAgTVVMVElQTEVfUExBVEZPUk1TID0gJzQwMCcsXG4gIFBMQVRGT1JNX05PVF9GT1VORCA9ICc0MDEnLFxuICBFUlJPUl9IQU5ETEVSX05PVF9GT1VORCA9ICc0MDInLFxuICBCT09UU1RSQVBfQ09NUE9ORU5UU19OT1RfRk9VTkQgPSAnNDAzJyxcbiAgQUxSRUFEWV9ERVNUUk9ZRURfUExBVEZPUk0gPSAnNDA0JyxcbiAgQVNZTkNfSU5JVElBTElaRVJTX1NUSUxMX1JVTk5JTkcgPSAnNDA1JyxcblxuICAvLyBTdHlsaW5nIEVycm9yc1xuXG4gIC8vIERlY2xhcmF0aW9ucyBFcnJvcnNcblxuICAvLyBpMThuIEVycm9yc1xuXG4gIC8vIENvbXBpbGF0aW9uIEVycm9yc1xufVxuXG5leHBvcnQgY2xhc3MgUnVudGltZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29kZTogUnVudGltZUVycm9yQ29kZSwgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoZm9ybWF0UnVudGltZUVycm9yKGNvZGUsIG1lc3NhZ2UpKTtcbiAgfVxufVxuXG4vLyBDb250YWlucyBhIHNldCBvZiBlcnJvciBtZXNzYWdlcyB0aGF0IGhhdmUgZGV0YWlscyBndWlkZXMgYXQgYW5ndWxhci5pby5cbi8vIEZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgZXJyb3IgZ3VpZGVzIGNhbiBiZSBmb3VuZCBhdCBodHRwczovL2FuZ3VsYXIuaW8vZXJyb3JzXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby10b3BsZXZlbC1wcm9wZXJ0eS1hY2Nlc3MgKi9cbmV4cG9ydCBjb25zdCBSVU5USU1FX0VSUk9SU19XSVRIX0dVSURFUyA9IG5ldyBTZXQoW1xuICBSdW50aW1lRXJyb3JDb2RlLkVYUFJFU1NJT05fQ0hBTkdFRF9BRlRFUl9DSEVDS0VELFxuICBSdW50aW1lRXJyb3JDb2RlLkNZQ0xJQ19ESV9ERVBFTkRFTkNZLFxuICBSdW50aW1lRXJyb3JDb2RlLlBST1ZJREVSX05PVF9GT1VORCxcbiAgUnVudGltZUVycm9yQ29kZS5NVUxUSVBMRV9DT01QT05FTlRTX01BVENILFxuICBSdW50aW1lRXJyb3JDb2RlLkVYUE9SVF9OT1RfRk9VTkQsXG4gIFJ1bnRpbWVFcnJvckNvZGUuUElQRV9OT1RfRk9VTkQsXG5dKTtcbi8qIHRzbGludDplbmFibGU6bm8tdG9wbGV2ZWwtcHJvcGVydHktYWNjZXNzICovXG5cbi8qKiBDYWxsZWQgdG8gZm9ybWF0IGEgcnVudGltZSBlcnJvciAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFJ1bnRpbWVFcnJvcihjb2RlOiBSdW50aW1lRXJyb3JDb2RlLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmdWxsQ29kZSA9IGNvZGUgPyBgTkcwJHtjb2RlfTogYCA6ICcnO1xuXG4gIGxldCBlcnJvck1lc3NhZ2UgPSBgJHtmdWxsQ29kZX0ke21lc3NhZ2V9YDtcblxuICAvLyBTb21lIHJ1bnRpbWUgZXJyb3JzIGFyZSBzdGlsbCB0aHJvd24gd2l0aG91dCBgbmdEZXZNb2RlYCAoZm9yIGV4YW1wbGVcbiAgLy8gYHRocm93UHJvdmlkZXJOb3RGb3VuZEVycm9yYCksIHNvIHdlIGFkZCBgbmdEZXZNb2RlYCBjaGVjayBoZXJlIHRvIGF2b2lkIHB1bGxpbmdcbiAgLy8gYFJVTlRJTUVfRVJST1JTX1dJVEhfR1VJREVTYCBzeW1ib2wgaW50byBwcm9kIGJ1bmRsZXMuXG4gIC8vIFRPRE86IHJldmlzaXQgYWxsIGluc3RhbmNlcyB3aGVyZSBgUnVudGltZUVycm9yYCBpcyB0aHJvd24gYW5kIHNlZSBpZiBgbmdEZXZNb2RlYCBjYW4gYmUgYWRkZWRcbiAgLy8gdGhlcmUgaW5zdGVhZCB0byB0cmVlLXNoYWtlIG1vcmUgZGV2bW9kZS1vbmx5IGNvZGUgKGFuZCBldmVudHVhbGx5IHJlbW92ZSBgbmdEZXZNb2RlYCBjaGVja1xuICAvLyBmcm9tIHRoaXMgY29kZSkuXG4gIGlmIChuZ0Rldk1vZGUgJiYgUlVOVElNRV9FUlJPUlNfV0lUSF9HVUlERVMuaGFzKGNvZGUpKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gYCR7ZXJyb3JNZXNzYWdlfS4gRmluZCBtb3JlIGF0ICR7RVJST1JfREVUQUlMU19QQUdFX0JBU0VfVVJMfS9ORzAke2NvZGV9YDtcbiAgfVxuICByZXR1cm4gZXJyb3JNZXNzYWdlO1xufVxuIl19