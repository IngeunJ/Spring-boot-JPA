package com.ingeun.web.service;

import java.util.List;

import com.ingeun.web.domain.CustomerDTO;

import org.springframework.stereotype.Component;

/**
 * CustomerService
 */
@Component
public interface CustomerService {

    public void addCustomer(CustomerDTO customer);
    public List<CustomerDTO> findCustomers();
    public List<CustomerDTO> findCustomersByOption(CustomerDTO option);
    public CustomerDTO findCustomerByCustomerId(String customerId);
    public void updateCustomer(CustomerDTO customer);
    public void deleteCustomer(String customer);
    public int countAll();
    public CustomerDTO login(CustomerDTO customer);

}