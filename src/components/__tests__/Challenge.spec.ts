import { shallowMount } from '@vue/test-utils'
import Challenge from '../Challenge.vue'

describe('Challenge.vue', () => {
    test('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(Challenge, {
            propsData: { msg }
        })
        expect(wrapper.text()).toMatch(msg)
    })
})