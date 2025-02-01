import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CandidateMode from '../CandidateMode.vue'

interface ComponentProps {
  candidateMode?: boolean;
}

describe('CandidateMode', () => {

  function mountWrapper(props?: ComponentProps) {
    const wrapper = mount(CandidateMode, {
      props: props
    });

    return wrapper;
  }

  it('mounts with no props sent in', async () => {
    const wrapper = mountWrapper({})
    expect(wrapper.find(".normal").classes("active")).toBe(true)
    expect(wrapper.find(".candidate").classes("active")).toBe(false)
  })

  it('mounts with candidate mode set to false', () => {
    const wrapper = mountWrapper({ candidateMode: false })
    expect(wrapper.find(".normal").classes("active")).toBe(true)
    expect(wrapper.find(".candidate").classes("active")).toBe(false)
  })

  it('mounts with candidate mode set to true', () => {
    const wrapper = mountWrapper({ candidateMode: true })
    expect(wrapper.find(".normal").classes("active")).toBe(false)
    expect(wrapper.find(".candidate").classes("active")).toBe(true)
  })

  it('should switch to candidate mode on click', async () => {

    const wrapper = mountWrapper({ candidateMode: false })
    await wrapper.find({ ref: "candidateMode" }).trigger("click");

    let emit = wrapper.emitted('changed')
    expect(emit).toHaveLength(1)

    if (emit) {
      expect(emit[0]).toEqual([{
        candidateMode: true
      }])
    }
  });

  it('should switch to normal mode on click', async () => {

    const wrapper = mountWrapper({ candidateMode: true })
    await wrapper.find({ ref: "normalMode" }).trigger("click");

    let emit = wrapper.emitted('changed')
    expect(emit).toHaveLength(1)

    if (emit) {
      expect(emit[0]).toEqual([{
        candidateMode: false
      }])
    }
  });
})
