class Prompt {
  constructor(name, prompt) {
    Object.assign(this, prompt, {
      name: name,
      message: prompt.description,
      
      validate: async val => typeof val === 'string' 
        ? val.trim().length
          ? !prompt.minlength || val.trim().length >= prompt.minlength
            ? !prompt.maxlength || val.trim().length <= prompt.maxlength
              ? prompt.validate ? await prompt.validate(val.trim()) : val.trim()
              : `${val.trim().length - prompt.maxlength} chars too long` 
            : `too short, min: ${prompt.minlength} chars` 
          : prompt.optional || prompt.type === 'number' || 'required'
        : prompt.validate ? await prompt.validate(val) : val,

      format: async val => prompt.format 
        ? await prompt.format(val?.trim?.() || val) 
        : val?.trim?.() || val
    })
  }
}

export { Prompt }
