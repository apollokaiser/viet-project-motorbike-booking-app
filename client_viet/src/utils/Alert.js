import Swal, { SweetAlertIcon } from "sweetalert2";
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});
export default class Alert {
    /**
 * 
 * @param {string} message 
 * @param {SweetAlertIcon} icon 
 */
    static showToast = (message, icon) => {
        toast.fire({
            icon: icon,
            title: message,
        });
    }
    static showError = (message) => {
        this.showToast(message, 'error');
    }
    static showSuccess = (message) => {
        this.showToast(message, 'success');
    }
    /**
     * @param {string} message 
     * @param {SweetAlertIcon} icon 
     * @param {Function} cb 
     */
    static showAlertDialog = (title, message, icon = "success", cb = null, buttonText = "Trở lại") => {
        (async () => {
            const { value: confirm } = await Swal.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonText: buttonText
            });
            if (confirm && cb) {
                cb(confirm)
            }
        })();
    }
}
export { toast }