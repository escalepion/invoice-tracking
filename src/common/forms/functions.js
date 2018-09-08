export const validateEmptyInput = (value) => {
  return !value && 'Bu alan boş olamaz';
}

export const validateMail = (value) => {
  if(value) {
      const re = /\S+@\S+\.\S+/;
      return !re.test(value) ? 'Lütfen geçerli bir mail adresi girin' : undefined; 
  }
}