/**
 * Wallet Service
 * Handles all wallet-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../config/api.config';
import type { Transaction, RechargeMethod, WithdrawMethod } from '../../types';

export interface WalletBalance {
  balance: number;
  currency: string;
}

export interface RechargeRequest {
  amount: number;
  method: RechargeMethod;
}

export interface WithdrawRequest {
  amount: number;
  method: WithdrawMethod;
}

export const walletService = {
  /**
   * Get wallet balance
   */
  async getBalance() {
    return apiClient.get<WalletBalance>(API_ENDPOINTS.WALLET.BALANCE);
  },
  
  /**
   * Get transaction history
   */
  async getTransactions() {
    return apiClient.get<Transaction[]>(API_ENDPOINTS.WALLET.TRANSACTIONS);
  },
  
  /**
   * Recharge wallet
   */
  async recharge(request: RechargeRequest) {
    return apiClient.post<Transaction>(API_ENDPOINTS.WALLET.RECHARGE, request);
  },
  
  /**
   * Withdraw from wallet
   */
  async withdraw(request: WithdrawRequest) {
    return apiClient.post<Transaction>(API_ENDPOINTS.WALLET.WITHDRAW, request);
  },
};

export default walletService;
