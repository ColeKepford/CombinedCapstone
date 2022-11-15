package com.HailMaryAPI.HailMary.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.HailMaryAPI.HailMary.Logging.LoggingController;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final LoggingController logs;


    @Autowired
    public AdminService(AdminRepository adminRepository, LoggingController logs) {
        this.adminRepository = adminRepository;
        this.logs = logs;
    }


    public Admin getAdminById(int id) {
        boolean exists = adminRepository.existsById(id);
        if(!exists) {
            logs.adminDoesntExist("Admin with id: " + id + " doesnt exsist");
        }
        logs.adminRetrievedSuccessfully("Admin with id: " + id + " was retrieved");
        return adminRepository.getOne(id);
    }

    public void addNewAdmin(Admin admin) {
        Optional<Admin> adminOptional = adminRepository.findAdminByEmail(admin.getEmail());
        if(adminOptional.isPresent()) {
            logs.adminDoesExist("Admin: " + admin.getEmail() + " already exsists");
        }
        logs.adminAddedSuccessfully("Successfully added: " + admin.getEmail() + " as an admin");
        adminRepository.save(admin);
    }

    public Admin credentials(String email, String password){
        Optional<Admin> adminOptional = adminRepository.findAdmin(email,password);
        if(adminOptional.isPresent()){
            logs.adminRetrievedSuccessfully("Admin: " + email + " was retrieved");
            return adminOptional.get();
        }
        else {
            logs.adminDoesntExist("Admin: " + email + " does not exsist");
            return null;
        }
    }
}
