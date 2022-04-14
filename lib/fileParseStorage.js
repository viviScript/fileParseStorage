class FileFilter {
    constructor(file) {
        this.file = file;
    }

    // 获取当前file
    getFile() {
        return this.file;
    }

    // 根据file大小计算size中文大小
    getFileSize() {
        const file = this.file;
        return file.size > 1024
            ? file.size / 1024 > 1024
                ? file.size / (1024 * 1024) > 1024
                    ? (file.size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
                    : (file.size / (1024 * 1024)).toFixed(2) + 'MB'
                : (file.size / 1024).toFixed(2) + 'KB'
            : (file.size).toFixed(2) + 'B';
    }

    fileToBase64() {
        const file = this.file;
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            try {
                reader.readAsDataURL(file);    // 获取图片base64字节码
                reader.onload = function (event) {
                    resolve(event.target.result.split(',')[1])
                }
            } catch (e) {
                console.log(e, 'toBase64 error')
                reject('')
            }
        })
    }

    fileToBlob() {
        const file = this.file;
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            try {
                reader.readAsDataURL(file);    // 获取图片base64字节码
                reader.onload = function (event) {
                    resolve(new Blob([event.target.result], {type: file.type}))
                }
            } catch (e) {
                console.log(e, 'toBlob error')
                reject('')
            }
        })
    }
}

export default FileFilter;