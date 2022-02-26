/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentHarness, parallel, } from '@angular/cdk/testing';
import { MatDividerHarness } from '@angular/material/divider/testing';
import { MatSubheaderHarness } from './list-item-harness-base';
/**
 * Shared behavior among the harnesses for the various `MatList` flavors.
 * @template T A constructor type for a list item harness type used by this list harness.
 * @template C The list item harness type that `T` constructs.
 * @template F The filter type used filter list item harness of type `C`.
 * @docs-private
 */
export class MatListHarnessBase extends ComponentHarness {
    /**
     * Gets a list of harnesses representing the items in this list.
     * @param filters Optional filters used to narrow which harnesses are included
     * @return The list of items matching the given filters.
     */
    async getItems(filters) {
        return this.locatorForAll(this._itemHarness.with(filters))();
    }
    /**
     * Gets a list of `ListSection` representing the list items grouped by subheaders. If the list has
     * no subheaders it is represented as a single `ListSection` with an undefined `heading` property.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sections by subheader.
     */
    async getItemsGroupedBySubheader(filters) {
        const listSections = [];
        let currentSection = { items: [] };
        const itemsAndSubheaders = await this.getItemsWithSubheadersAndDividers({
            item: filters,
            divider: false,
        });
        for (const itemOrSubheader of itemsAndSubheaders) {
            if (itemOrSubheader instanceof MatSubheaderHarness) {
                if (currentSection.heading !== undefined || currentSection.items.length) {
                    listSections.push(currentSection);
                }
                currentSection = { heading: itemOrSubheader.getText(), items: [] };
            }
            else {
                currentSection.items.push(itemOrSubheader);
            }
        }
        if (currentSection.heading !== undefined ||
            currentSection.items.length ||
            !listSections.length) {
            listSections.push(currentSection);
        }
        // Concurrently wait for all sections to resolve their heading if present.
        return parallel(() => listSections.map(async (s) => ({ items: s.items, heading: await s.heading })));
    }
    /**
     * Gets a list of sub-lists representing the list items grouped by dividers. If the list has no
     * dividers it is represented as a list with a single sub-list.
     * @param filters Optional filters used to narrow which list item harnesses are included
     * @return The list of items matching the given filters, grouped into sub-lists by divider.
     */
    async getItemsGroupedByDividers(filters) {
        const listSections = [[]];
        const itemsAndDividers = await this.getItemsWithSubheadersAndDividers({
            item: filters,
            subheader: false,
        });
        for (const itemOrDivider of itemsAndDividers) {
            if (itemOrDivider instanceof MatDividerHarness) {
                listSections.push([]);
            }
            else {
                listSections[listSections.length - 1].push(itemOrDivider);
            }
        }
        return listSections;
    }
    async getItemsWithSubheadersAndDividers(filters = {}) {
        const query = [];
        if (filters.item !== false) {
            query.push(this._itemHarness.with(filters.item || {}));
        }
        if (filters.subheader !== false) {
            query.push(MatSubheaderHarness.with(filters.subheader));
        }
        if (filters.divider !== false) {
            query.push(MatDividerHarness.with(filters.divider));
        }
        return this.locatorForAll(...query)();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1oYXJuZXNzLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGlzdC90ZXN0aW5nL2xpc3QtaGFybmVzcy1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFHaEIsUUFBUSxHQUNULE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUF3QixpQkFBaUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBRTNGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBVzdEOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBZ0Isa0JBSXBCLFNBQVEsZ0JBQWdCO0lBR3hCOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsMEJBQTBCLENBQUMsT0FBVztRQUUxQyxNQUFNLFlBQVksR0FBYyxFQUFFLENBQUM7UUFDbkMsSUFBSSxjQUFjLEdBQVksRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDMUMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQztZQUN0RSxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxNQUFNLGVBQWUsSUFBSSxrQkFBa0IsRUFBRTtZQUNoRCxJQUFJLGVBQWUsWUFBWSxtQkFBbUIsRUFBRTtnQkFDbEQsSUFBSSxjQUFjLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDdkUsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsY0FBYyxHQUFHLEVBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUM7YUFDbEU7aUJBQU07Z0JBQ0wsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDNUM7U0FDRjtRQUNELElBQ0UsY0FBYyxDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQ3BDLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUMzQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQ3BCO1lBQ0EsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNuQztRQUVELDBFQUEwRTtRQUMxRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FDbkIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FDMUUsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUFXO1FBQ3pDLE1BQU0sWUFBWSxHQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQztZQUNwRSxJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztRQUNILEtBQUssTUFBTSxhQUFhLElBQUksZ0JBQWdCLEVBQUU7WUFDNUMsSUFBSSxhQUFhLFlBQVksaUJBQWlCLEVBQUU7Z0JBQzlDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzNEO1NBQ0Y7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBb0RELEtBQUssQ0FBQyxpQ0FBaUMsQ0FDckMsVUFJSSxFQUFFO1FBRU4sTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFLLEVBQVEsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudEhhcm5lc3MsXG4gIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcixcbiAgSGFybmVzc1ByZWRpY2F0ZSxcbiAgcGFyYWxsZWwsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7RGl2aWRlckhhcm5lc3NGaWx0ZXJzLCBNYXREaXZpZGVySGFybmVzc30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGl2aWRlci90ZXN0aW5nJztcbmltcG9ydCB7QmFzZUxpc3RJdGVtSGFybmVzc0ZpbHRlcnMsIFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzfSBmcm9tICcuL2xpc3QtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7TWF0U3ViaGVhZGVySGFybmVzc30gZnJvbSAnLi9saXN0LWl0ZW0taGFybmVzcy1iYXNlJztcblxuLyoqIFJlcHJlc2VudHMgYSBzZWN0aW9uIG9mIGEgbGlzdCBmYWxsaW5nIHVuZGVyIGEgc3BlY2lmaWMgaGVhZGVyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaXN0U2VjdGlvbjxJPiB7XG4gIC8qKiBUaGUgaGVhZGluZyBmb3IgdGhpcyBsaXN0IHNlY3Rpb24uIGB1bmRlZmluZWRgIGlmIHRoZXJlIGlzIG5vIGhlYWRpbmcuICovXG4gIGhlYWRpbmc/OiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBpdGVtcyBpbiB0aGlzIGxpc3Qgc2VjdGlvbi4gKi9cbiAgaXRlbXM6IElbXTtcbn1cblxuLyoqXG4gKiBTaGFyZWQgYmVoYXZpb3IgYW1vbmcgdGhlIGhhcm5lc3NlcyBmb3IgdGhlIHZhcmlvdXMgYE1hdExpc3RgIGZsYXZvcnMuXG4gKiBAdGVtcGxhdGUgVCBBIGNvbnN0cnVjdG9yIHR5cGUgZm9yIGEgbGlzdCBpdGVtIGhhcm5lc3MgdHlwZSB1c2VkIGJ5IHRoaXMgbGlzdCBoYXJuZXNzLlxuICogQHRlbXBsYXRlIEMgVGhlIGxpc3QgaXRlbSBoYXJuZXNzIHR5cGUgdGhhdCBgVGAgY29uc3RydWN0cy5cbiAqIEB0ZW1wbGF0ZSBGIFRoZSBmaWx0ZXIgdHlwZSB1c2VkIGZpbHRlciBsaXN0IGl0ZW0gaGFybmVzcyBvZiB0eXBlIGBDYC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1hdExpc3RIYXJuZXNzQmFzZTxcbiAgVCBleHRlbmRzIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvcjxDPiAmIHt3aXRoOiAob3B0aW9ucz86IEYpID0+IEhhcm5lc3NQcmVkaWNhdGU8Qz59LFxuICBDIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzcyxcbiAgRiBleHRlbmRzIEJhc2VMaXN0SXRlbUhhcm5lc3NGaWx0ZXJzLFxuPiBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBwcm90ZWN0ZWQgX2l0ZW1IYXJuZXNzOiBUO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBoYXJuZXNzZXMgcmVwcmVzZW50aW5nIHRoZSBpdGVtcyBpbiB0aGlzIGxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIE9wdGlvbmFsIGZpbHRlcnMgdXNlZCB0byBuYXJyb3cgd2hpY2ggaGFybmVzc2VzIGFyZSBpbmNsdWRlZFxuICAgKiBAcmV0dXJuIFRoZSBsaXN0IG9mIGl0ZW1zIG1hdGNoaW5nIHRoZSBnaXZlbiBmaWx0ZXJzLlxuICAgKi9cbiAgYXN5bmMgZ2V0SXRlbXMoZmlsdGVycz86IEYpOiBQcm9taXNlPENbXT4ge1xuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwodGhpcy5faXRlbUhhcm5lc3Mud2l0aChmaWx0ZXJzKSkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBgTGlzdFNlY3Rpb25gIHJlcHJlc2VudGluZyB0aGUgbGlzdCBpdGVtcyBncm91cGVkIGJ5IHN1YmhlYWRlcnMuIElmIHRoZSBsaXN0IGhhc1xuICAgKiBubyBzdWJoZWFkZXJzIGl0IGlzIHJlcHJlc2VudGVkIGFzIGEgc2luZ2xlIGBMaXN0U2VjdGlvbmAgd2l0aCBhbiB1bmRlZmluZWQgYGhlYWRpbmdgIHByb3BlcnR5LlxuICAgKiBAcGFyYW0gZmlsdGVycyBPcHRpb25hbCBmaWx0ZXJzIHVzZWQgdG8gbmFycm93IHdoaWNoIGxpc3QgaXRlbSBoYXJuZXNzZXMgYXJlIGluY2x1ZGVkXG4gICAqIEByZXR1cm4gVGhlIGxpc3Qgb2YgaXRlbXMgbWF0Y2hpbmcgdGhlIGdpdmVuIGZpbHRlcnMsIGdyb3VwZWQgaW50byBzZWN0aW9ucyBieSBzdWJoZWFkZXIuXG4gICAqL1xuICBhc3luYyBnZXRJdGVtc0dyb3VwZWRCeVN1YmhlYWRlcihmaWx0ZXJzPzogRik6IFByb21pc2U8TGlzdFNlY3Rpb248Qz5bXT4ge1xuICAgIHR5cGUgU2VjdGlvbiA9IHtpdGVtczogQ1tdOyBoZWFkaW5nPzogUHJvbWlzZTxzdHJpbmc+fTtcbiAgICBjb25zdCBsaXN0U2VjdGlvbnM6IFNlY3Rpb25bXSA9IFtdO1xuICAgIGxldCBjdXJyZW50U2VjdGlvbjogU2VjdGlvbiA9IHtpdGVtczogW119O1xuICAgIGNvbnN0IGl0ZW1zQW5kU3ViaGVhZGVycyA9IGF3YWl0IHRoaXMuZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKHtcbiAgICAgIGl0ZW06IGZpbHRlcnMsXG4gICAgICBkaXZpZGVyOiBmYWxzZSxcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IGl0ZW1PclN1YmhlYWRlciBvZiBpdGVtc0FuZFN1YmhlYWRlcnMpIHtcbiAgICAgIGlmIChpdGVtT3JTdWJoZWFkZXIgaW5zdGFuY2VvZiBNYXRTdWJoZWFkZXJIYXJuZXNzKSB7XG4gICAgICAgIGlmIChjdXJyZW50U2VjdGlvbi5oZWFkaW5nICE9PSB1bmRlZmluZWQgfHwgY3VycmVudFNlY3Rpb24uaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgbGlzdFNlY3Rpb25zLnB1c2goY3VycmVudFNlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRTZWN0aW9uID0ge2hlYWRpbmc6IGl0ZW1PclN1YmhlYWRlci5nZXRUZXh0KCksIGl0ZW1zOiBbXX07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50U2VjdGlvbi5pdGVtcy5wdXNoKGl0ZW1PclN1YmhlYWRlcik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGN1cnJlbnRTZWN0aW9uLmhlYWRpbmcgIT09IHVuZGVmaW5lZCB8fFxuICAgICAgY3VycmVudFNlY3Rpb24uaXRlbXMubGVuZ3RoIHx8XG4gICAgICAhbGlzdFNlY3Rpb25zLmxlbmd0aFxuICAgICkge1xuICAgICAgbGlzdFNlY3Rpb25zLnB1c2goY3VycmVudFNlY3Rpb24pO1xuICAgIH1cblxuICAgIC8vIENvbmN1cnJlbnRseSB3YWl0IGZvciBhbGwgc2VjdGlvbnMgdG8gcmVzb2x2ZSB0aGVpciBoZWFkaW5nIGlmIHByZXNlbnQuXG4gICAgcmV0dXJuIHBhcmFsbGVsKCgpID0+XG4gICAgICBsaXN0U2VjdGlvbnMubWFwKGFzeW5jIHMgPT4gKHtpdGVtczogcy5pdGVtcywgaGVhZGluZzogYXdhaXQgcy5oZWFkaW5nfSkpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2Ygc3ViLWxpc3RzIHJlcHJlc2VudGluZyB0aGUgbGlzdCBpdGVtcyBncm91cGVkIGJ5IGRpdmlkZXJzLiBJZiB0aGUgbGlzdCBoYXMgbm9cbiAgICogZGl2aWRlcnMgaXQgaXMgcmVwcmVzZW50ZWQgYXMgYSBsaXN0IHdpdGggYSBzaW5nbGUgc3ViLWxpc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIE9wdGlvbmFsIGZpbHRlcnMgdXNlZCB0byBuYXJyb3cgd2hpY2ggbGlzdCBpdGVtIGhhcm5lc3NlcyBhcmUgaW5jbHVkZWRcbiAgICogQHJldHVybiBUaGUgbGlzdCBvZiBpdGVtcyBtYXRjaGluZyB0aGUgZ2l2ZW4gZmlsdGVycywgZ3JvdXBlZCBpbnRvIHN1Yi1saXN0cyBieSBkaXZpZGVyLlxuICAgKi9cbiAgYXN5bmMgZ2V0SXRlbXNHcm91cGVkQnlEaXZpZGVycyhmaWx0ZXJzPzogRik6IFByb21pc2U8Q1tdW10+IHtcbiAgICBjb25zdCBsaXN0U2VjdGlvbnM6IENbXVtdID0gW1tdXTtcbiAgICBjb25zdCBpdGVtc0FuZERpdmlkZXJzID0gYXdhaXQgdGhpcy5nZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoe1xuICAgICAgaXRlbTogZmlsdGVycyxcbiAgICAgIHN1YmhlYWRlcjogZmFsc2UsXG4gICAgfSk7XG4gICAgZm9yIChjb25zdCBpdGVtT3JEaXZpZGVyIG9mIGl0ZW1zQW5kRGl2aWRlcnMpIHtcbiAgICAgIGlmIChpdGVtT3JEaXZpZGVyIGluc3RhbmNlb2YgTWF0RGl2aWRlckhhcm5lc3MpIHtcbiAgICAgICAgbGlzdFNlY3Rpb25zLnB1c2goW10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdFNlY3Rpb25zW2xpc3RTZWN0aW9ucy5sZW5ndGggLSAxXS5wdXNoKGl0ZW1PckRpdmlkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGlzdFNlY3Rpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIGhhcm5lc3NlcyByZXByZXNlbnRpbmcgYWxsIG9mIHRoZSBpdGVtcywgc3ViaGVhZGVycywgYW5kIGRpdmlkZXJzXG4gICAqIChpbiB0aGUgb3JkZXIgdGhleSBhcHBlYXIgaW4gdGhlIGxpc3QpLiBVc2UgYGluc3RhbmNlb2ZgIHRvIGNoZWNrIHdoaWNoIHR5cGUgb2YgaGFybmVzcyBhIGdpdmVuXG4gICAqIGl0ZW0gaXMuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIE9wdGlvbmFsIGZpbHRlcnMgdXNlZCB0byBuYXJyb3cgd2hpY2ggbGlzdCBpdGVtcywgc3ViaGVhZGVycywgYW5kIGRpdmlkZXJzIGFyZVxuICAgKiAgICAgaW5jbHVkZWQuIEEgdmFsdWUgb2YgYGZhbHNlYCBmb3IgdGhlIGBpdGVtYCwgYHN1YmhlYWRlcmAsIG9yIGBkaXZpZGVyYCBwcm9wZXJ0aWVzIGluZGljYXRlc1xuICAgKiAgICAgdGhhdCB0aGUgcmVzcGVjdGl2ZSBoYXJuZXNzIHR5cGUgc2hvdWxkIGJlIG9taXR0ZWQgY29tcGxldGVseS5cbiAgICogQHJldHVybiBUaGUgbGlzdCBvZiBoYXJuZXNzZXMgcmVwcmVzZW50aW5nIHRoZSBpdGVtcywgc3ViaGVhZGVycywgYW5kIGRpdmlkZXJzIG1hdGNoaW5nIHRoZVxuICAgKiAgICAgZ2l2ZW4gZmlsdGVycy5cbiAgICovXG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzOiB7XG4gICAgaXRlbTogZmFsc2U7XG4gICAgc3ViaGVhZGVyOiBmYWxzZTtcbiAgICBkaXZpZGVyOiBmYWxzZTtcbiAgfSk6IFByb21pc2U8W10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVyczoge1xuICAgIGl0ZW0/OiBGIHwgZmFsc2U7XG4gICAgc3ViaGVhZGVyOiBmYWxzZTtcbiAgICBkaXZpZGVyOiBmYWxzZTtcbiAgfSk6IFByb21pc2U8Q1tdPjtcbiAgZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKGZpbHRlcnM6IHtcbiAgICBpdGVtOiBmYWxzZTtcbiAgICBzdWJoZWFkZXI/OiBTdWJoZWFkZXJIYXJuZXNzRmlsdGVycyB8IGZhbHNlO1xuICAgIGRpdmlkZXI6IGZhbHNlO1xuICB9KTogUHJvbWlzZTxNYXRTdWJoZWFkZXJIYXJuZXNzW10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVyczoge1xuICAgIGl0ZW06IGZhbHNlO1xuICAgIHN1YmhlYWRlcjogZmFsc2U7XG4gICAgZGl2aWRlcj86IERpdmlkZXJIYXJuZXNzRmlsdGVycyB8IGZhbHNlO1xuICB9KTogUHJvbWlzZTxNYXREaXZpZGVySGFybmVzc1tdPjtcbiAgZ2V0SXRlbXNXaXRoU3ViaGVhZGVyc0FuZERpdmlkZXJzKGZpbHRlcnM6IHtcbiAgICBpdGVtPzogRiB8IGZhbHNlO1xuICAgIHN1YmhlYWRlcj86IFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzIHwgZmFsc2U7XG4gICAgZGl2aWRlcjogZmFsc2U7XG4gIH0pOiBQcm9taXNlPChDIHwgTWF0U3ViaGVhZGVySGFybmVzcylbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzOiB7XG4gICAgaXRlbT86IEYgfCBmYWxzZTtcbiAgICBzdWJoZWFkZXI6IGZhbHNlO1xuICAgIGRpdmlkZXI/OiBmYWxzZSB8IERpdmlkZXJIYXJuZXNzRmlsdGVycztcbiAgfSk6IFByb21pc2U8KEMgfCBNYXREaXZpZGVySGFybmVzcylbXT47XG4gIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhmaWx0ZXJzOiB7XG4gICAgaXRlbTogZmFsc2U7XG4gICAgc3ViaGVhZGVyPzogZmFsc2UgfCBTdWJoZWFkZXJIYXJuZXNzRmlsdGVycztcbiAgICBkaXZpZGVyPzogZmFsc2UgfCBEaXZpZGVySGFybmVzc0ZpbHRlcnM7XG4gIH0pOiBQcm9taXNlPChNYXRTdWJoZWFkZXJIYXJuZXNzIHwgTWF0RGl2aWRlckhhcm5lc3MpW10+O1xuICBnZXRJdGVtc1dpdGhTdWJoZWFkZXJzQW5kRGl2aWRlcnMoZmlsdGVycz86IHtcbiAgICBpdGVtPzogRiB8IGZhbHNlO1xuICAgIHN1YmhlYWRlcj86IFN1YmhlYWRlckhhcm5lc3NGaWx0ZXJzIHwgZmFsc2U7XG4gICAgZGl2aWRlcj86IERpdmlkZXJIYXJuZXNzRmlsdGVycyB8IGZhbHNlO1xuICB9KTogUHJvbWlzZTwoQyB8IE1hdFN1YmhlYWRlckhhcm5lc3MgfCBNYXREaXZpZGVySGFybmVzcylbXT47XG4gIGFzeW5jIGdldEl0ZW1zV2l0aFN1YmhlYWRlcnNBbmREaXZpZGVycyhcbiAgICBmaWx0ZXJzOiB7XG4gICAgICBpdGVtPzogRiB8IGZhbHNlO1xuICAgICAgc3ViaGVhZGVyPzogU3ViaGVhZGVySGFybmVzc0ZpbHRlcnMgfCBmYWxzZTtcbiAgICAgIGRpdmlkZXI/OiBEaXZpZGVySGFybmVzc0ZpbHRlcnMgfCBmYWxzZTtcbiAgICB9ID0ge30sXG4gICk6IFByb21pc2U8KEMgfCBNYXRTdWJoZWFkZXJIYXJuZXNzIHwgTWF0RGl2aWRlckhhcm5lc3MpW10+IHtcbiAgICBjb25zdCBxdWVyeSA9IFtdO1xuICAgIGlmIChmaWx0ZXJzLml0ZW0gIT09IGZhbHNlKSB7XG4gICAgICBxdWVyeS5wdXNoKHRoaXMuX2l0ZW1IYXJuZXNzLndpdGgoZmlsdGVycy5pdGVtIHx8ICh7fSBhcyBGKSkpO1xuICAgIH1cbiAgICBpZiAoZmlsdGVycy5zdWJoZWFkZXIgIT09IGZhbHNlKSB7XG4gICAgICBxdWVyeS5wdXNoKE1hdFN1YmhlYWRlckhhcm5lc3Mud2l0aChmaWx0ZXJzLnN1YmhlYWRlcikpO1xuICAgIH1cbiAgICBpZiAoZmlsdGVycy5kaXZpZGVyICE9PSBmYWxzZSkge1xuICAgICAgcXVlcnkucHVzaChNYXREaXZpZGVySGFybmVzcy53aXRoKGZpbHRlcnMuZGl2aWRlcikpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKC4uLnF1ZXJ5KSgpO1xuICB9XG59XG4iXX0=