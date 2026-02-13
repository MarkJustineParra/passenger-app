/**
 * User Service
 * Handles all user-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../config/api.config';
import type { User } from '../../types';

export interface UpdateProfileData {
  name?: string;
  email?: string;
  address?: string;
  profileImage?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  /**
   * Get user profile
   */
  async getProfile() {
    return apiClient.get<User>(API_ENDPOINTS.USER.PROFILE);
  },
  
  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData) {
    return apiClient.put<User>(API_ENDPOINTS.USER.UPDATE_PROFILE, data);
  },
  
  /**
   * Change password
   */
  async changePassword(data: ChangePasswordData) {
    return apiClient.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
  },
  
  /**
   * Delete account
   */
  async deleteAccount() {
    return apiClient.delete(API_ENDPOINTS.USER.DELETE_ACCOUNT);
  },
};

export default userService;
