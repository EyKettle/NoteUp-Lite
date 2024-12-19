use std::{env, fs::metadata};

use tauri::{Manager, Theme};
use window_vibrancy::{apply_acrylic, apply_mica};

mod utils;
use utils::document::{read_file_path, read_md_file, set_file_path};

#[tauri::command]
fn read_file(path: &str) -> String {
    read_md_file(path).unwrap_or("".to_string())
}

#[tauri::command]
fn file_exists(path: &str) -> bool {
    match metadata(path) {
        Ok(metadata) => metadata.is_file(),
        Err(_) => false,
    }
}

#[tauri::command]
fn get_file_path() -> String {
    read_file_path()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            let dark = { window.theme().unwrap() == Theme::Dark };
            match apply_mica(&window, Some(dark)) {
                Ok(_) => println!("[Window] Applied Mica."),
                Err(_) => {
                    if apply_acrylic(
                        &window,
                        if dark {
                            Some((32, 32, 32, 200))
                        } else {
                            Some((210, 210, 210, 200))
                        },
                    ).is_ok() {
                        println!("[Window] Applied Acrylic.")
                    }
                }
            }
            window.show().expect("Initialized failed because of show window failed.");
            let args = env::args().collect::<Vec<String>>();
            let file_path = args.get(1).unwrap_or(&String::from("")).to_string();
            if !file_path.is_empty() {
                set_file_path(&file_path);
            }
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![read_file, file_exists, get_file_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
