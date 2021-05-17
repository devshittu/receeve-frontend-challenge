import {shallowMount} from '@vue/test-utils'
import Dashboard from '../Dashboard.vue'

describe('Dashboard.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = shallowMount(Dashboard, {
            methods: {
                initializeAppData: () => {
                }
            }
        })
    })
    it('should render', function () {
        expect(wrapper.exists()).toBe(true)
    });

    it('Does chart exist', function () {
        expect(wrapper.find("#barChartId")).toBe({})
    });
})