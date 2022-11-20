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