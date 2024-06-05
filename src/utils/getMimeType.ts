export function getMimeType(fileKey: string): string {
  const extension: string = fileKey.split('.').pop()!.toLowerCase();
  if (extension === 'pdf') {
    return 'application/pdf';
  } else if (['jpg', 'jpeg'].includes(extension)) {
    return 'image/jpeg';
  } else if (extension === 'png') {
    return 'image/png';
  } else if (['doc', 'docx'].includes(extension)) {
    return 'application/msword';
  } else if (['xls', 'xlsx', 'xlt'].includes(extension)) {
    return 'application/vnd.ms-excel';
  } else if (extension === 'xml') {
    return 'application/xml';
  } else if (['rar', 'zip'].includes(extension)) {
    return 'application/x-compressed';
  }

  return ""
}
