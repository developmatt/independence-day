export const maskPhone = (v: string) => {
  v = v.replace(/\D/g,'');
  v = v.replace(/(^\d{2})(\d)/,'($1) $2');
  v = v.replace(/(\d{5})(\d{4}$)/,'$1-$2');
  return v
}