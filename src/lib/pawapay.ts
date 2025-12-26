// PawaPay API Integration - Sandbox Environment
const PAWAPAY_API_URL = 'https://api.sandbox.pawapay.io';
const PAWAPAY_TOKEN = 'eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjE0MTAwIiwibWF2IjoiMSIsImV4cCI6MjA4MTI0ODc4MiwiaWF0IjoxNzY1NzE1OTgyLCJwbSI6IkRBRixQQUYiLCJqdGkiOiJhMWQyMzJhNC1lYWJmLTRmZmUtOTc5Ni1mNjU3NmE5NDY1NTUifQ.P3svJlWnjmKIGXFQdjg0-jKo9TXRKKrASBAckMhGUVF9ptqmks0OtiwCwKXGuvM7Y9Ypr0aDwsO96_KBdLRRtg';

export interface PaymentRequest {
  amount: string;
  currency: string;
  correspondent: string; // MTN_MOMO_CMR or ORANGE_CMR
  payer: {
    type: string;
    address: {
      value: string;
    };
  };
  customerTimestamp: string;
  statementDescription: string;
}

export interface PaymentResponse {
  depositId: string;
  status: string;
  requestedAmount: {
    value: string;
    currency: string;
  };
  depositedAmount?: {
    value: string;
    currency: string;
  };
  correspondent: string;
  payer: {
    type: string;
    address: {
      value: string;
    };
  };
  customerTimestamp: string;
  statementDescription: string;
  created: string;
  correspondentIds: {
    transactionId?: string;
  };
}

// Cameroon Mobile Money Operators
export const CAMEROON_OPERATORS = [
  {
    id: 'MTN_MOMO_CMR',
    name: 'MTN Mobile Money',
    logo: '🟡',
    color: 'bg-yellow-500',
    prefix: ['650', '651', '652', '653', '654']
  },
  {
    id: 'ORANGE_CMR',
    name: 'Orange Money',
    logo: '🟠',
    color: 'bg-orange-500',
    prefix: ['690', '691', '692', '693', '694', '695', '696', '697', '698', '699']
  }
];

export class PawaPayService {
  private static getHeaders() {
    return {
      'Authorization': `Bearer ${PAWAPAY_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  static async initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${PAWAPAY_API_URL}/v2/deposits`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment initiation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('PawaPay payment error:', error);
      throw error;
    }
  }

  static async checkPaymentStatus(depositId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${PAWAPAY_API_URL}/v2/deposits/${depositId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }

      return await response.json();
    } catch (error) {
      console.error('PawaPay status check error:', error);
      throw error;
    }
  }

  static detectOperator(phoneNumber: string): string | null {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    for (const operator of CAMEROON_OPERATORS) {
      for (const prefix of operator.prefix) {
        if (cleanNumber.startsWith('237' + prefix) || cleanNumber.startsWith(prefix)) {
          return operator.id;
        }
      }
    }
    
    return null;
  }

  static formatPhoneNumber(phoneNumber: string): string {
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present
    if (cleaned.length === 9 && !cleaned.startsWith('237')) {
      cleaned = '237' + cleaned;
    }
    
    return cleaned;
  }

  static generateTransactionId(): string {
    return 'IAI_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}