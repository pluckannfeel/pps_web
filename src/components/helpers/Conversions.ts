export function detectLocalPath(path: string): string {
    // my local directory
    if (path.indexOf('C:\\Users\\') === 0) {
        // index 0 always start like this

        // if path includes C:\\Users\\paday\\OneDrive\\Desktop\\Development\\pps_api\\uploads (base directory + upload file directory)
        if (path.indexOf('C:\\Users\\paday\\OneDrive\\Desktop\\Development\\pps_api\\uploads\\') === 0) {
            // index 0 always start like this
            // returns file name with extension
            return path.replace('C:\\Users\\paday\\OneDrive\\Desktop\\Development\\pps_api\\uploads\\', '');
        }

    }

    return path;
}

// file to base64
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

export function getBase64(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }