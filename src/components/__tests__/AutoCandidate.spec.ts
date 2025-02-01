import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoCandidate from '../AutoCandidate.vue'

interface ComponentProps {
  autoCandidate?: boolean;
}

describe('CandidateMode', () => {

  function mountWrapper(props?: ComponentProps) {
    const wrapper = mount(AutoCandidate, {
      props: props,
      attachTo: document.body
    });

    return wrapper;
  }

  it('mounts with no props sent in', async () => {
    const wrapper = mountWrapper({})
    expect(wrapper.vm.checked).toBeFalsy()
  })

  it('mounts with autoCandidate set to false', async () => {
    const wrapper = mountWrapper({autoCandidate: false})
    expect(wrapper.vm.checked).toBeFalsy()
  })

  it('mounts with autoCandidate set to true', async () => {
    const wrapper = mountWrapper({autoCandidate: true})
    expect(wrapper.vm.checked).toBeTruthy()
  })

  it('should emit an event when the autoCandidate mode is set to true', async () => {

    const wrapper = mountWrapper({ autoCandidate: false })
    const checkbox = wrapper.find("input[type='checkbox']")
    await checkbox.trigger("click")

    let emit = wrapper.emitted('changed')
    expect(emit).toHaveLength(1)

    if (emit) {
      expect(emit[0]).toEqual([{
        autoCandidate: true
      }])
    }
  });

  it('should emit an event when the autoCandidate mode is set to false', async () => {

    const wrapper = mountWrapper({ autoCandidate: true })
    const checkbox = wrapper.find("input[type='checkbox']")
    await checkbox.trigger("change")

    let emit = wrapper.emitted('changed')
    expect(emit).toHaveLength(1)

    if (emit) {
      expect(emit[0]).toEqual([{
        autoCandidate: false
      }])
    }
  });
})
